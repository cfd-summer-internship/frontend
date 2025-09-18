"use client";

import Uppy from "@uppy/core";
import AwsS3 from "@uppy/aws-s3";
import GoldenRetriever from "@uppy/golden-retriever";
import {
  useAbortMPU,
  useCompleteMPU,
  useCreateMPU,
  useSignPart,
} from "@/utils/dash/staff/hooks";
import { useAtomValue } from "jotai";
import { tokenAtom } from "@/utils/auth/store";
import { useEffect, useMemo, useRef } from "react";
import { Dashboard } from "@uppy/react";
import { ZipReader, BlobReader, BlobWriter } from "@zip.js/zip.js";
import "@/styles/uppy.css";
import { useQueryClient } from "@tanstack/react-query";

const S3_SINGLE_THRESHOLD = 100 * 2 ** 20; //100mb
const MAX_FILES = 20_000;
const MAX_UNCOMPRESSED = 10 * 1024 ** 3; //10gb
const MAX_PER_FILE = 200 * 1024 ** 2; //200mb
const MAX_PARALLEL_FILES = 2;

const IMG_EXTS = [".jpg", ".jpeg", ".png"];

function sanitizePath(name: string) {
  const n = name.replace(/\\/g, "/").replace(/^\/+/, "");
  return n
    .split("/")
    .filter((s) => s && s !== "." && s !== "..")
    .join("/");
}

function guessMime(name: string) {
  const n = name.toLowerCase();
  if (n.endsWith(".jpg") || n.endsWith(".jpeg")) return "image/jpeg";
  if (n.endsWith(".png")) return "image/png";
  return "application/octet-stream";
}

function shrinkFile(uppy, file, extraMeta = {}) {
  // tiny empty blob keeps types happy but uses ~0 bytes
  const empty = new Blob([], { type: file.type || "application/octet-stream" });

  uppy.setFileState(file.id, {
    // free memory
    data: empty, // or: null (if all your plugins can handle null)
    preview: null, // ThumbnailGenerator preview
    thumbnail: null, // (some setups store a separate field)
    // keep useful result metadata (location/key, etc.)
    meta: { ...file.meta, ...extraMeta },
    // make sure UI shows "done" and never retries this file
    progress: {
      ...file.progress,
      bytesUploaded: file.size,
      bytesTotal: file.size,
      percentage: 100,
      uploadComplete: true,
      uploadStarted: file.progress?.uploadStarted ?? Date.now(),
    },
  });
}

export async function addZipEntriesToUppy(uppy: Uppy, zipBlob: Blob) {
  //Initialize Reader
  const reader = new ZipReader(new BlobReader(zipBlob), {
    useWebWorkers: true,
  });
  const getExt = (p: string) => {
    const s = p.toLowerCase().replace(/\\/g, "/");
    const dot = s.lastIndexOf(".");
    const slash = s.lastIndexOf("/");
    return dot > slash ? s.slice(dot) : "";
  };
  const basename = (p: string) =>
    p.replace(/\\/g, "/").split("/").pop() || "file";
  const isMacJunk = (path: string) => {
    const p = path.replace(/\\/g, "/");
    const base = p.split("/").pop() || "";
    return (
      p.startsWith("__MACOSX/") || // Finder's metadata folder
      base === ".DS_Store" || // Finder index
      base === "Icon\r" || // Finder custom folder icon
      base.startsWith("._") // AppleDouble sidecar (._photo.jpg)
    );
  };

  let filesExtracted = 0;

  try {
    //console.log('zip size/type:', zipBlob.size, (zipBlob as File).type)
    const entries = await reader.getEntries();
    //Check Size
    const totalUncompressed = entries.reduce(
      (sum, e) => sum + (e.uncompressedSize || 0),
      0
    );
    if (entries.length > MAX_FILES || totalUncompressed > MAX_UNCOMPRESSED)
      throw new Error("Too big");

    // For each file entry produce a Blob and push into Uppy
    for (const entry of entries) {
      if (entry.directory) continue; //navigate to file

      const safePath = sanitizePath(entry.filename);
      if (isMacJunk(safePath)) continue; //Skip macos stuff
      const ext = getExt(safePath);
      if (!IMG_EXTS.includes(ext)) continue; //skip non images

      if ((entry.uncompressedSize ?? 0) > MAX_PER_FILE)
        throw new Error("Single file too large");

      const name = basename(safePath); //strip leading dir
      const type = guessMime(name); //get mime type

      const blob = await entry.getData(new BlobWriter(type), {
        useWebWorkers: true,
      }); //get blob
      await uppy.addFile({
        name: name,
        type,
        data: blob,
        meta: { originalPath: safePath },
      }); //add file to uppy

      filesExtracted++;
      console.log(filesExtracted);
    }
  } catch (err: any) {
    //uppy.info(err, 'error', 6000)
    //console.error('zip read error:', err)
  } finally {
    //Close reader
    await reader?.close().catch(() => {});
  }
}

export default function ZipUloader() {
  const token = useAtomValue(tokenAtom);
  const queryClient = useQueryClient();

  //   const dropRef = useRef<HTMLDivElement>(null);
  //   const statusRef = useRef<HTMLDivElement>(null);

  const uppy = useMemo(
    () =>
      new Uppy({
        autoProceed: false,
        restrictions: { allowedFileTypes: [".zip"] },
      }),
    []
  );

  useEffect(() => {
    const dash = uppy.getPlugin("Dashboard");
    dash?.setOptions({
      disableStatusBar: false, // show StatusBar
      showProgressDetails: true, // ETA / bytes
      hideUploadButton: false,
      hidePauseResumeButton: false, // show Pause/Resume
      hideCancelButton: false, // show Cancel
      hideRetryButton: false,
    });

    if (!uppy.getPlugin("GoldenRetriever")) uppy.use(GoldenRetriever);
    if (!uppy.getPlugin("AwsS3Multipart")) {
      uppy.use(AwsS3, {
        endpoint: "/api/s3-multipart",
        limit: MAX_PARALLEL_FILES,
        retryDelays: [0, 2000, 5000, 10000],
        shouldUseMultipart: () => true,
        createMultipartUpload: (file) =>
          useCreateMPU(token, {
            name: file.name ?? (file.data as File).name ?? "upload",
            type:
              file.type ??
              (file.data as File).type ??
              "application/octet-stream",
            size: file.size ?? (file.data as File).size,
          }),
        signPart: (_file, { uploadId, key, partNumber, signal }) =>
          useSignPart({ token, uploadId, key, partNumber }),
        completeMultipartUpload: (_file, { uploadId, key, parts }) =>
          useCompleteMPU(
            { size: _file.size ?? (_file.data as File).size },
            { token, uploadId, key, parts }
          ),
        abortMultipartUpload: (_file, { uploadId, key }) =>
          useAbortMPU({ token, uploadId, key }),
      });
    }
  }, [uppy]);

  useEffect(() => {
    const onAddFiles = async (file: any) => {
      const name = (file.name || "").toLowerCase();
      if (!name.endsWith(".zip")) return;

      uppy.removeFile(file.id);

      // Allow any type to remove .zip UI restriction
      const prevAllowed = uppy.opts.restrictions?.allowedFileTypes ?? null;
      const prevAuto = uppy.opts.autoProceed;

      uppy.setOptions({
        restrictions: { ...uppy.opts.restrictions, allowedFileTypes: IMG_EXTS },
        autoProceed: true,
      });
      try {
        const zipBlob = file.data as Blob;
        await addZipEntriesToUppy(uppy, zipBlob);
        // uppy
        //   .getPlugin("Dashboard")
        //   ?.setOptions({ note: `Extracted ${file.name}` });
      } catch (e) {
        console.error("unzip failed", e);
        uppy.info('Failed to extract ZIP', 'error', 5000)
      } finally {
        // restore the original restriction
        uppy.setOptions({
          restrictions: {
            ...(uppy.opts.restrictions ?? {}),
            allowedFileTypes: prevAllowed,
          },
          autoProceed: prevAuto,
        });
      }
    };
    uppy.on("file-added", onAddFiles);
    return () => {
      uppy.off("file-added", onAddFiles);
    };
  }, [uppy]);

  useEffect(() => {
    const onSuccess = (file: any, response) => {
      const uploadedKey =
        response?.location || response?.uploadURL || file.meta?.uploadedKey;
      shrinkFile(uppy, file, { uploadedKey });
      // console.log('uploaded', file.name)
      // uppy.removeFile(file.id)
    };

    uppy.on("upload-success", onSuccess);

    return () => {
      uppy.off("upload-success", onSuccess); // cleanup
    };
  }, [uppy]);

  useEffect(() => {
    const onComplete = () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    };

    uppy.on("complete", onComplete);
    return () => {
      uppy.off("complete", onComplete);
    };
  }, [uppy, queryClient]);

  return (
    <div className="flex items-center justify-center align-center">
      <Dashboard
        className="w-fit outline outline-stone-600 rounded-lg text-center p-4"
        uppy={uppy}
        width={450}
        height={350}
        proudlyDisplayPoweredByUppy={false}
      />
    </div>
  );
}
