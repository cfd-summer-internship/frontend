"use client";

import { Trash2, Download, FileSpreadsheet } from "lucide-react";
import {
  useDeleteResultMutation,
  useExportAllResults,
  useExportResult,
  useGetResearcherResults,
} from "@/utils/dash/researcher/hooks";
import { useAtomValue } from "jotai";
import { tokenAtom } from "@/utils/auth/store";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { ConfirmAlert } from "../Confirm";
import { ResultsView } from "../ResultsView";

export default function ResearcherConfigView() {

  const {
    data: rows = [],
    isLoading,
    isError,
    error,
  } = useGetResearcherResults();

  

  return (
    <ResultsView 
      rows={rows}
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  );
   
}
