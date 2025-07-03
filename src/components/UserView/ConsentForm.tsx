"use client";

import { useConsentForm } from "@/utils/consentForm/hooks";
import { useQueryClient } from "@tanstack/react-query";

export default function ConsentForm() {
    const queryClient = useQueryClient();
    const studyID = queryClient.getQueryData<{data:string}>(["studyID"])?.data ?? "";
    const {data:consentForm} = useConsentForm(studyID);

    return (
        <div className="flex flex-col items-center w-screen h-screen mt-10">
            <iframe src={consentForm} 
            className="w-1/2 h-3/4 border-none"></iframe>
        </div>
    )
}