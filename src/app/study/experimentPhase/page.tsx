"use client";

import { useExperimentPhaseConfig } from "@/utils/experimentPhase/hooks";
import { useStudyID } from "@/utils/fileRetrieval/hooks";
import ImageDisplayComponent from "@/components/UserView/ImageDisplay";

export default function ExperimentPhasePage() {
    const studyID = useStudyID();
<<<<<<< HEAD
    const { data: config, isLoading: loadingConfig } = useExperimentPhaseConfig(studyID);
    if (loadingConfig) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-stone-900">
            <span className="loader"></span>
        </div>);
    if (!config) return <div className="text-red-500">Failed to load data.</div>;
=======

    const { data: config, isLoading: loadingConfig } = useExperimentPhaseConfig(studyID);

    if (loadingConfig || !config) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-stone-900 text-white px-4">
            <span className="loader"></span>
        </div>)
>>>>>>> 6a19e08 (feat: response time and image ids)

    return (
        <ImageDisplayComponent
            config={config}
            nextPhaseName={"Conclusion"}
            nextPhaseRoute={"/study/conclusionPhase"}
        />
    );
}
