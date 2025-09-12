"use client";

import Uppy from '@uppy/core';
import AwsS3 from '@uppy/aws-s3';
import GoldenRetriever from '@uppy/golden-retriever'
import { useAbortMPU, useCompleteMPU, useCreateMPU, useSignPart } from '@/utils/dash/staff/hooks'
import { useAtomValue } from "jotai";
import { tokenAtom } from "@/utils/auth/store";
import { useEffect, useMemo, useRef } from 'react';
import { Dashboard } from '@uppy/react'

const S3_SINGLE_THRESHOLD = 100 * 2 ** 20 //100mb

export default function ZipUloader() {
    const token = useAtomValue(tokenAtom);

    const dropRef = useRef<HTMLDivElement>(null);
    const statusRef = useRef<HTMLDivElement>(null);

    const uppy = useMemo(() => new Uppy({
        autoProceed: false,
        restrictions: { allowedFileTypes: ['.zip'] }
    }), []);

    useEffect(() => {
        if (!uppy.getPlugin('GoldenRetriever')) uppy.use(GoldenRetriever)
        if (!uppy.getPlugin("AwsS3Multipart")) {
            uppy.use(AwsS3, {
                endpoint: '/api/s3-multipart',
                shouldUseMultipart: () => true,
                createMultipartUpload: (file) => useCreateMPU(token, {
                    name: file.name ?? (file.data as File).name ?? 'upload',
                    type: file.type ?? (file.data as File).type ?? 'application/octet-stream',
                    size: file.size ?? (file.data as File).size,
                }),
                signPart: (_file, { uploadId, key, partNumber, signal }) =>
                    useSignPart({ token, uploadId, key, partNumber }),
                completeMultipartUpload: (_file, { uploadId, key, parts }) =>
                    useCompleteMPU({ size: _file.size ?? (_file.data as File).size, }, { token, uploadId, key, parts }),
                abortMultipartUpload: (_file, { uploadId, key }) =>
                    useAbortMPU({ token, uploadId, key }),
            })
        }
    }, [uppy]);


    return (
        <>
            <Dashboard
                uppy={uppy}
                width={720}
                height={420}
                theme="auto"
                proudlyDisplayPoweredByUppy={false}
            />
        </>
    );
}