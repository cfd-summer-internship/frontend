"use client";

import { Download, FileSpreadsheet, Trash2 } from "lucide-react";
import { ConfirmAlert } from "./Confirm";
import { useEffect, useState } from "react";
import {
  useDeleteResultMutation,
  useExportAllResults,
  useExportResult,
} from "@/utils/dash/researcher/hooks";
import { useAtomValue } from "jotai";
import { tokenAtom } from "@/utils/auth/store";
import { useQueryClient } from "@tanstack/react-query";
import { study_code_len } from "@/schemas/const";



export function ResultsView({rows, isLoading, isError, error, onDelete }) {
  const [resultsID, setResultsID] = useState<string>("");
  const [deleteRequest, setDeleteRequest] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  const results = useExportResult(resultsID);
  const allResults = useExportAllResults();

  const token = useAtomValue(tokenAtom);

  const deleteResult = useDeleteResultMutation();
  const queryClient = useQueryClient();

  const handleDelete = async (resultID: string) => {
    await deleteResult.mutateAsync(
      { token: token, resultID: resultID },
      {
        onSuccess: async () => {
          // await queryClient.invalidateQueries({ queryKey: ["results"] });
          // await queryClient.refetchQueries({ queryKey: ["results"] });
          onDelete?.(); // Call the parent's refetch
        },
      }
    );
  };

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
    a.download = `results-${resultsID.slice(-study_code_len)}.csv`;
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
        <span className="font-bold text-2xl pt-8">Results</span>
        <span className="text-md pb-2">
          <p className="pb-4">View, Export, and Delete Study Results.</p>
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
                    <FileSpreadsheet /> {row.config_id.slice(-study_code_len)}
                  </div>
                </td>
                <td className="py-2">{row.subject_id.slice(-study_code_len)}</td>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmAlert
        open={openAlert}
        onOpenChange={(v) => {
          setOpenAlert(v);
        }}
        onConfirm={ async () => {
          await handleDelete(deleteRequest);
          setOpenAlert(false);
        }}
      />
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
