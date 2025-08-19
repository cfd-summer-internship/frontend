"use client";
import { z } from "zod";
import StudyRetrievalInput from "./StudyRetrievalInput";
import { SyntheticEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid"

const codeFormModel = z.object({
    studyCode: z.string().nonempty("Code Required").length(6)
})

export default function StudyRetrieval() {
    const router = useRouter();
    const queryClient = useQueryClient();
    if (localStorage.getItem("localStudyID")) localStorage.removeItem("localStudyID")

    async function handleSubmit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
        e.preventDefault();

        //Take in Form Data
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        //Parse it safely using Zod
        const result = codeFormModel.safeParse({
            studyCode: formData.get("code"),
        })

        //If Succesfully Parsed
        if (result.success) {
            const res = await fetch(`/api/study/study_id/${result.data.studyCode}`, { method: "GET" });
            if (!res.ok)
                throw new Error("Unable to Find Study")

            const data = await res.json();

            const uuidSchema = z.string().uuid();
            const validatedID = uuidSchema.safeParse(data);

            if (validatedID.success) {
                queryClient.setQueryData(["studyID"], validatedID.data);
                localStorage.setItem("localStudyID", validatedID.data);
                if (localStorage.getItem("subjectID") == null) {
                    localStorage.setItem("subjectID", uuidv4())
                }
                router.push("/study/consentForm")
            }
        }

    }
    return (
        <div className="flex flex-col items-center m-4">
            <span className="text-stone-300 pb-4 font-semibold">Please Enter Your 6-Digit Study Code Below</span>
            <form onSubmit={handleSubmit}>
                <StudyRetrievalInput name="code" />

                <button className="bg-emerald-700 text-stone-300 py-2 px-4 mx-3 rounded-lg"
                    type="submit">Start</button>
            </form>
        </div>
    )
}