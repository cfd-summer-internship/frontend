"use client";

import { useConsentForm, useStudyID } from "@/utils/consentForm/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function ConsentForm() {
    const queryClient = useQueryClient();
    const studyID = useStudyID();

    const { data: formURL } = useConsentForm(studyID);
    return (
        <div className="flex flex-col items-center w-screen h-screen mt-10">
            <iframe src={formURL}
                className="w-1/2 h-3/4 border-none"></iframe>
        </div>
    )
}