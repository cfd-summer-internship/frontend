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
import { ConfirmAlert } from "../Confirm";
import ConfigView from "../ConfigView";

export default function ResearcherConfigView() {
  const { data: rows, isLoading, isError, error } = useGetResearcherConfig();

  return (
    <ConfigView
      rows={rows}
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  );

}
