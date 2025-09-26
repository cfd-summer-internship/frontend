"use client";

import { useExperimentPhaseConfig } from "@/utils/experimentPhase/hooks";
import { useStudyID } from "@/utils/fileRetrieval/hooks";
import ImageDisplayComponent from "@/components/UserView/ImageDisplay";
import { useState } from "react";
import ErrorDisplay from "@/components/UserView/Error";

type Phase = "learning" | "experiment";

export default function ExperimentPhaseImages() {
  const studyID = useStudyID();
  const { data: config, isLoading: loadingConfig } =
    useExperimentPhaseConfig(studyID);
  const [phase, setPhase] = useState<Phase>("experiment");

  if (loadingConfig)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-stone-900">
        <span className="loader"></span>
      </div>
    );
  if (!config) return <ErrorDisplay />;

  return (
    <ImageDisplayComponent
      config={config}
      nextPhaseName={"Conclusion"}
      nextPhaseRoute={"/study/conclusion"}
      currentPhase={phase}
    />
  );
}
