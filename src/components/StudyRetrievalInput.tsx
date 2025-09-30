"use client";
import { study_code_len } from "@/schemas/const";

export default function StudyRetrievalInput({name}
) 
{
    return (
        <input
            name={name}
            placeholder="Study Code"
            className="bg-stone-700 text-stone-200 px-8 py-2 rounded-lg placeholder:text-stone-500 focus:outline-none"
            autoComplete="off"
            maxLength={study_code_len}>
            </input>
    )
}