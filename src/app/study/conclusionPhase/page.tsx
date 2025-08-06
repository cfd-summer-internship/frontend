"use client";
import { useStudyID } from "@/utils/fileRetrieval/hooks";
import { useConclusionPhaseConfig, useSurveyQuestions } from "@/utils/conclusionPhase/hooks";
import SurveyForm from "@/components/UserView/SurveyForm";

export default function ConclusionPhasePage() {
    const studyID = useStudyID();
    const { data: config, isLoading } = useConclusionPhaseConfig(studyID);
    const { data: surveyData } = useSurveyQuestions(studyID);

    if (isLoading) return <div className="text-white">Loading conclusion phase...</div>;
    if (!config) return <div className="text-red-500">Failed to load conclusion config.</div>;

    return (
        <div className="flex flex-col items-center min-h-screen bg-stone-900 px-4 py-8">

            {config.has_survey && surveyData?.questions?.length > 0 && (
                <SurveyForm
                    questions={surveyData.questions}
                    studyID={studyID}
                />
            )}
        </div>
    );
}
