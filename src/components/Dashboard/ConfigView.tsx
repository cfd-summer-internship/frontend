"use client";

import { Trash2, Download, FileSpreadsheet } from "lucide-react";
import {
  useDeleteConfigMutation,
  useGetResearcherConfig,
} from "@/utils/dash/researcher/hooks";
import { useAtomValue } from "jotai";
import { tokenAtom } from "@/utils/auth/store";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useExportConfig } from "@/utils/configUpload/hooks";
import { useStudyCodeForID } from "@/utils/studyRetrieval/hooks";
import { ConfirmAlert } from "./Confirm";

export default function ConfigView({ rows, isLoading, isError, error }) {
  const router = useRouter();
  const [studyCode, setStudyCode] = useState<string>("");
  const [deleteRequest, setDeleteRequest] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  const studyID = useStudyCodeForID(studyCode);
  const config = useExportConfig(studyID.data);

  const deleteConfig = useDeleteConfigMutation();
  const queryClient = useQueryClient();

  const token = useAtomValue(tokenAtom);

  const handleDelete = async (studyCode: string) => {
    deleteConfig.mutate(
      { token: token, studyCode: studyCode },
      {
        onSuccess() {
          queryClient.invalidateQueries({ queryKey: ["configs"] });
          queryClient.invalidateQueries({ queryKey: ["results"] });
        },
      }
    );
  };

  useEffect(() => {
    if (!config.data || !studyID.data) return;

    const blob = new Blob([JSON.stringify(config.data, undefined, 2)], {
      type: "text/plain",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `study-${studyCode}.config`;
    a.click();

    URL.revokeObjectURL(url);
    setStudyCode("");
  }, [config.data, studyCode, studyID.data]);

  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <span className="loader"></span>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex text-center justify-center text-red-300">
        {error.toString()}
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col text-center justify-center text-stone-300">
        <span className="font-bold text-2xl pt-8">Configurations</span>
        <span className="text-md pb-2">
          <p className="pb-4">Create, View, Download, and Delete Configuration Files. </p>
        </span>
      </div>
      <div className="text-stone-300 pt-4">
        <table className="min-w-full">
          <thead className="bg-stone-800">
            <tr>
              <th>Config</th>
              <th>Download</th>
              {/* <th>Edit</th> */}
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {rows?.study_codes?.map((studyCode) => (
              <tr key={studyCode}>
                <td className="py-2">
                  <div className="flex flew-row align-center justify-center gap-2">
                    <FileSpreadsheet /> {studyCode}
                  </div>
                </td>
                <td className="py-2">
                  <button
                    className="hover:text-emerald-500 hover:cursor-pointer"
                    onClick={() => setStudyCode(studyCode)}
                  >
                    <Download className="w-5" />
                  </button>
                </td>
                {/* <td className="py-2">
                  <button className="hover:text-stone-100 hover:cursor-pointer">
                    <Pencil className="w-5" />
                  </button>
                </td> */}
                <td className="py-2">
                  <button
                    className="hover:text-red-500 hover:cursor-pointer"
                    onClick={() => {
                      setDeleteRequest(studyCode);
                      setOpenAlert(true);
                    }}
                  >
                    <Trash2 className="w-5" />
                  </button>
                  <ConfirmAlert
                    open={openAlert}
                    onOpenChange={(v) => {
                      setOpenAlert(v);
                    }}
                    onConfirm={() => {
                      handleDelete(deleteRequest);
                      setOpenAlert(false);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          className="bg-stone-800 hover:outline-1 outline-stone-700 rounded-sm text-stone-300 px-8 py-2 mt-21 ml-21 hover:cursor-pointer"
          onClick={() => router.push("/studyConfig")}
        >
          New Configuration
        </button>
      </div>
    </>
  );
}
