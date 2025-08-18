"use client";

import { useExperimentPhaseConfig } from "@/utils/experimentPhase/hooks";
import { useStudyID } from "@/utils/fileRetrieval/hooks";
import ImageDisplayComponent from "@/components/UserView/ImageDisplay";

export default function ExperimentPhasePage() {
    const studyID = useStudyID();

    const { data: config, isLoading: loadingConfig } = useExperimentPhaseConfig(studyID);

    if (loadingConfig || !config) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-stone-900 text-white px-4">
            <span className="loader"></span>
        </div>)

    return (
        <ImageDisplayComponent
            config={config}
            nextPhaseName={"Conclusion"}
            nextPhaseRoute={"/study/conclusionPhase"}
        />
    );
}
