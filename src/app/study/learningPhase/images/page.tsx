"use client";

import { useLearningPhaseConfig } from "@/utils/learningPhase/hooks";
import { useStudyID } from "@/utils/fileRetrieval/hooks";
import ImageDisplayComponent from "@/components/UserView/ImageDisplay";
import { useState } from "react";
import ErrorDisplay from "@/components/UserView/Error";

type Phase = "learning" | "experiment";

export default function LearningPhaseImages() {
  const studyID = useStudyID();
  const { data: config, isLoading: loadingConfig } =
    useLearningPhaseConfig(studyID);
  const [phase, setPhase] = useState<Phase>("learning");

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
      nextPhaseRoute={"/study/waitPhase"}
      nextPhaseName={"Wait"}
      currentPhase={phase}
    />
  );
}
