"use client";
import { z } from "zod";
import StudyRetrievalInput from "./StudyRetrievalInput";
import { SyntheticEvent } from "react";

const codeFormModel = z.object({
    studyCode: z.string().nonempty("Code Required").length(6)
})

//type CodeForm = z.infer<typeof codeFormModel>

export default function StudyRetrieval() {

    function handleSubmit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
        e.preventDefault();
        
        //Take in Form Data
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        //Parse it safely using Zod
        const result = codeFormModel.safeParse({
            studyCode: formData.get("code"),
        })
        
        if (result.success) {
            console.log(result.data)
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