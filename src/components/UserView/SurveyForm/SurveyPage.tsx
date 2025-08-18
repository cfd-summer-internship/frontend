"use client";

import { Toaster } from "react-hot-toast";
import SurveyForm from "@/components/UserView/SurveyForm/SurveyForm";

export default function ConclusionPhaseSurveyPage({ studyID }: { studyID: string })  {

    return (
        <div className="flex flex-col items-center min-h-screen bg-stone-900 px-4 py-8">
            <SurveyForm studyID={studyID!} />
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        </div>
    );
}
