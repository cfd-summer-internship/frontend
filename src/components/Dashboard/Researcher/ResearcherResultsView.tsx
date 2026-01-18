"use client";

import { useGetResearcherResults } from "@/utils/dash/researcher/hooks";
import { ResultsView } from "../ResultsView";

export default function ResearcherConfigView() {
  const {
    data: rows = [],
    isLoading,
    isError,
    error,
    refetch
  } = useGetResearcherResults();

  return (
    <ResultsView
      rows={rows}
      isLoading={isLoading}
      isError={isError}
      error={error}
      onDelete={async () => {
        await refetch();
      }}
    />
  );
}
