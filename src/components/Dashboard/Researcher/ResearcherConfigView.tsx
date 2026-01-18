"use client";

import { useGetResearcherConfig } from "@/utils/dash/researcher/hooks";
import ConfigView from "../ConfigView";

export default function ResearcherConfigView() {
  const { data: rows, isLoading, isError, error, refetch } = useGetResearcherConfig();

  return (
    <ConfigView
      rows={rows}
      isLoading={isLoading}
      isError={isError}
      error={error}
      onDelete={() => refetch()}
    />
  );
}
