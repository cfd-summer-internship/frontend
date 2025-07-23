"use client";

import FileInput from "./FileInput";

export default function InstructionPhaseConfig({ header }:
    {
        header: string;
    }
) {
    return (
        <div className="flex flex-col items-start w-full px-10 border-b-2 border-stone-800">
            <h2 className="text-lg font-bold pt-4 text-stone-300">{header}</h2>
            <p className="italic text-stone-400 mb-4 text-sm">Upload instructional files for the study.</p>
            <FileInput desc="Consent Form" name="files.consentForm" acceptedFileTypes=".pdf"></FileInput>
            <FileInput desc="Study Instructions" name="files.studyInstructions" acceptedFileTypes=".pdf"></FileInput>
        </div>

    );
}