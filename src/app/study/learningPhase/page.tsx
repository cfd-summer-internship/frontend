"use client";

import { useLearningImageList, useLearningPhaseConfig } from "@/utils/learningPhase/hooks";
import { useStudyID } from "@/utils/fileRetrieval/hooks";
import LearningPhaseComponent from "@/components/LearningPhase/MainComponent";

export default function LearningPhasePage() {
    const studyID = useStudyID();
    const { data: imageList, isLoading: loadingImages } = useLearningImageList(studyID);
    const { data: config, isLoading: loadingConfig } = useLearningPhaseConfig(studyID);

    if (loadingImages || loadingConfig) return <div className="text-white">Loading...</div>;
    if (!imageList || !config) return <div className="text-red-500">Failed to load data.</div>;

    return (
        <LearningPhaseComponent
            imageList={imageList}
            config={config}
        />
    );
}
