"use client";
import FileInput from "@/components/StudyConfig/FileInput";

export default function ConclusionPhaseConfig({ header }: { header: string; }) {

    return (
        <div className="flex flex-col items-start w-full px-10">
            <h2 className="text-lg font-bold pt-4 text-stone-300">{header}</h2>
            <p className="italic text-stone-400 mb-4 text-sm">Set optional post-experiment parameters.</p>
            <div className='flex items-center w-full mr-4'>
                <label className='text-stone-300'>Demographic Survey:</label>
                <input type="checkbox" className='mx-4 bg-stone-700' name="conclusion.survey"></input>
            </div>
            <FileInput desc="Study Debrief" name="files.studyDebrief" acceptedFileTypes=".pdf"></FileInput>
        </div>
    )
}