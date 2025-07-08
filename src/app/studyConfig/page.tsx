"use client";

import FileInput from "@/components/StudyConfig/FileInput";
import LearningPhaseConfig from "@/components/StudyConfig/LearningPhaseConfig";
import WaitPhaseConfig from "@/components/StudyConfig/WaitPhaseConfig";
import ExperimentPhaseConfig from "@/components/StudyConfig/ExperimentPhaseConfig";

import { configurationSchema } from "@/schemas/studyConfigSchemas";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useConfigUploadMutation } from "@/utils/configUpload/hooks";
import ConclusionPhaseConfig from "@/components/StudyConfig/ConclusionPhaseConfig";
import * as parser from "./formParser";


export default function StudyConfigPage() {
    //Tracks if there is an error
    const [isIncomplete, setIncomplete] = useState<boolean>(false);
    const [isSaved,setSaved] = useState<boolean>(false);
    //Page Routing
    const router = useRouter()
    //Reference to custom config upload hook
    const uploadConfig = useConfigUploadMutation();

    //Map Configuration Settings
    function mapConfig(formData: FormData) {
        return {
            uploadedFiles: parser.mapUploadedFiles(formData),
            learningPhase: parser.mapLearning(formData),
            waitPhase: parser.mapWait(formData),
            experimentPhase: parser.mapExperiment(formData),
            conclusionPhase: parser.mapConclusion(formData)
        };
    }

    //On Submit
    function handleSubmit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
        e.preventDefault();

        //Get Form data
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        //Map form data to the corresponding Zod object to enforce strict typing
        const result = configurationSchema.safeParse(mapConfig(formData));

        //If there is an error display an error message
        if (!result.success) {
            setIncomplete(true);
            console.log(result.error.issues);
        }

        //If succesfully mapped
        if (result.success) {
            if (isIncomplete) setIncomplete(false);
            //Send the data to the backend
            uploadConfig.mutate(result.data, {
                onSuccess() {
                    //Use this to display a success message
                    setSaved(true);
                }
            })
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center">
                <div className="flex flex-col min-h-screen items-center">
                    <h1 className="text-xl text-center font-bold py-4 text-stone-300">Study Configuration</h1>

                    {/* Upload Section */}
                    <div className="flex flex-col items-start w-full px-10">
                        <h2 className="text-lg font-bold py-4 text-stone-300">Instructional Files</h2>
                        <p className="italic text-stone-400 mb-4 text-sm">Upload instructional files for the study.</p>
                        <FileInput desc="Consent Form" name="files.consentForm"></FileInput>
                        <FileInput desc="Study Instructions" name="files.studyInstructions"></FileInput>
                    </div>

                    {/* Learning Phase */}
                    <LearningPhaseConfig header="Learning Phase Configuration" />

                    {/* Wait Phase */}
                    <WaitPhaseConfig header="Wait Phase Configuration" />
                    
                    {/* Experiment Phase */}
                    <ExperimentPhaseConfig header="Experiment Phase Configuration" />

                    {/* Conclusion Phase */}
                    <ConclusionPhaseConfig header="Conclusion" />

                    {/* Incomplete Values Message */}
                    {isIncomplete && <span className="text-md text-red-500 italic my-4">Some fields are missing. Please fill them out before saving.</span>}
                    {isSaved && <span className="text-md text-emerald-500 italic my-4">Study Configuration Saved Succesfully!</span>}
                    {/* Action Buttons */}
                    <div className="flex flex-row justify-end w-full mb-4">
                        <button onClick={() => router.push("/")} className="bg-stone-700 hover:bg-stone-800 rounded-lg px-4 py-2 text-stone-300 mx-2">Cancel</button>
                        <button type="submit" className="bg-emerald-700 hover:bg-emerald-800 rounded-lg px-4 py-2 text-stone-300 mx-2">Save</button>
                    </div>
                </div>
            </div>
        </form>
    )
}