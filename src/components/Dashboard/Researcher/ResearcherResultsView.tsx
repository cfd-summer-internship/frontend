"use client";

import { Trash2, Pencil, Download, FileSpreadsheet } from "lucide-react";
import {
  useDeleteResultMutation,
  useExportAllResults,
  useExportResult,
  useGetResearcherConfig,
  useGetResearcherResults,
} from "@/utils/dash/researcher/hooks";
import { useAtomValue } from "jotai";
import { tokenAtom } from "@/utils/auth/store";
import { shouldThrowError, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ConfirmAlert } from "../Confirm";

export default function ResearcherConfigView() {
  const [resultsID, setResultsID] = useState<string>("");
  const [deleteRequest, setDeleteRequest] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const {
    data: rows = [],
    isLoading,
    isError,
    error,
  } = useGetResearcherResults();

  const results = useExportResult(resultsID);
  const allResults = useExportAllResults();

  const token = useAtomValue(tokenAtom);

  const deleteResult = useDeleteResultMutation();
  const queryClient = useQueryClient();

  queryClient.refetchQueries

  const handleDelete = (async (resultID: string) => {
    deleteResult.mutate({ token: token, resultID: resultID }, {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ['results'] })
      }
    });
  });

  const router = useRouter();

  const getSafeTimestamp = (): string => {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");

    return (
      `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}` +
      `_${pad(now.getHours())}-${pad(now.getMinutes())}`
    );
  };

  useEffect(() => {
    if (!results.data) return;

    const a = document.createElement("a");
    a.href = results.data;
    a.download = `results-${resultsID.slice(-6)}.csv`;
    a.click();

    URL.revokeObjectURL(results.data);
    setResultsID("");
  }, [results.data, resultsID]);

  useEffect(() => {
    if (!allResults.data) return;

    const a = document.createElement("a");
    a.href = allResults.data;
    a.download = `results-${getSafeTimestamp()}.csv`;
    a.click();

    URL.revokeObjectURL(allResults.data);
  }, [allResults.data]);

  return (
    <>
      <div className="flex flex-col text-center justify-center text-stone-300">
        <span className="font-bold text-2xl pt-8">Results</span>
        <span className="text-md pb-2">
          <p className="pb-4">Study Results</p>
        </span>
      </div>
      <div className="text-stone-300 pt-4">
        <table className="min-w-full">
          <thead className="bg-stone-800">
            <tr>
              <th>Study</th>
              <th>Subject</th>
              <th>Submitted</th>
              <th>Download</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="py-2">
                  <div className="flex flew-row align-center justify-center gap-2">
                    <FileSpreadsheet /> {row.config_id.slice(-6)}
                  </div>
                </td>
                <td className="py-2">{row.subject_id.slice(-6)}</td>
                <td className="py-2">
                  {new Date(row.submitted).toLocaleString()}
                </td>
                <td className="py-2">
                  <button
                    className="hover:text-emerald-500 hover:cursor-pointer"
                    onClick={() => setResultsID(row.id)}
                  >
                    <Download className="w-5" />
                  </button>
                </td>
                <td className="py-2">
                  <button
                    className="hover:text-red-500 hover:cursor-pointer"
                    onClick={() => {
                      setDeleteRequest(row.id);
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
          onClick={() => allResults.refetch()}
        >
          Download All
        </button>
      </div>
    </>
  );
}
