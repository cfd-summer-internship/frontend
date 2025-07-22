"use client";

import { useLearningPhaseConfig } from "@/utils/learningPhase/hooks";
import { useStudyID } from "@/utils/fileRetrieval/hooks";
import LearningPhaseComponent from "@/components/UserView/LearningPhase/LearningPhase";

export default function LearningPhasePage() {
    const studyID = useStudyID();
    const { data: config, isLoading: loadingConfig } = useLearningPhaseConfig(studyID);
    console.log(config)
    if (loadingConfig) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-stone-900">
            <span className="loader"></span>
        </div>);
    if (!config) return <div className="text-red-500">Failed to load data.</div>;

    return (
        <LearningPhaseComponent
            config={config}
        />
    );
}
