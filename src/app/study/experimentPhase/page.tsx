"use client";

import { useExperimentPhaseConfig } from "@/utils/experimentPhase/hooks";
import { useStudyID } from "@/utils/fileRetrieval/hooks";
import ImageDisplayComponent from "@/components/UserView/ImageDisplay";

export default function ExperimentPhasePage() {
    const studyID = useStudyID();
    
    const { data: config, isLoading: loadingConfig } = useExperimentPhaseConfig(studyID);

    if (loadingConfig) return <div className="text-white">Loading...</div>;
    if (!config) return <div className="text-red-500">Failed to load data.</div>;

    return (
        <ImageDisplayComponent
            config={config}
            nextPhaseName={"Conclusion"}
            nextPhaseRoute={"/study/conclusionPhase"}
        />
    );
}
