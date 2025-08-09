"use client";
import { Toaster } from "react-hot-toast";
import { useStudyID } from "@/utils/fileRetrieval/hooks";
import { useConclusionPhase } from "@/utils/conclusionPhase/hooks";
import SurveyForm from "@/components/UserView/SurveyForm";

export default function ConclusionPhasePage() {
    const studyID = useStudyID();
    const { config, questions, isLoading, isError } = useConclusionPhase(studyID);

    if (isLoading) return <div className="text-white">Loading conclusion phase…</div>;
    if (isError || !config) return <div className="text-red-500">Failed to load conclusion config.</div>;
    if (!config.has_survey) return <div className="text-white">No survey for this study.</div>;
    if (questions.length === 0) return <div className="text-white">No questions available.</div>;

    return (
        <div className="flex flex-col items-center min-h-screen bg-stone-900 px-4 py-8">
            <SurveyForm questions={questions} studyID={studyID!} />
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        </div>
    );
}
