"use client";
import { useStudyID } from "@/utils/fileRetrieval/hooks";
import { useConclusionPhase } from "@/utils/conclusionPhase/hooks";
import ConclusionPhaseSurveyPage from "@/components/UserView/SurveyForm/SurveyPage";
// import DebriefSection from "./DebriefSection";
// import ThankYou from ".ThankYou";

export default function ConclusionPhasePage() {
    const studyID = useStudyID();
    const { data, isLoading, isError } = useConclusionPhase(studyID);

    if (isLoading) return <div className="text-white">Loading conclusion phase…</div>;
    if (isError || !data) return <div className="text-red-500">Failed to load conclusion config.</div>;

    if (data.has_survey) {
        return <ConclusionPhaseSurveyPage studyID={studyID!} />;
    } //else if (data.show_results) {
    //     return <DebriefSection studyID={studyID!} />;
    // } else {
    //     return <ThankYou />;
    // }
}
