"use client";

import FileInput from "@/components/FileInput";
import { configurationSchema } from "@/schemas/studyConfigSchemas";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useConfigUploadMutation } from "@/utils/configUpload/hooks";
import ExperimentPhaseConfig from "@/components/ExperimentPhaseConfig";


export default function StudyConfigPage() {
    //Tracks if there is an error
    const [isError, setError] = useState<boolean>(false);
    //Page Routing
    const router = useRouter()
    //Reference to custom config upload hook
    const uploadConfig = useConfigUploadMutation();

    //Map Learning Phase Settings
    function mapLearning(formData: FormData) {
        return {
            displayDuration: Number(formData.get("learning.displayDuration")), //Convert to number
            pauseDuration: Number(formData.get("learning.pauseDuration")), //Convert to Number
            displayMethod: formData.get("learning.displayMethod")
        }
    }

    //Map Experiment Phase Settings
    function mapExperiment(formData: FormData) {
        return {
            displayDuration: Number(formData.get("experiment.displayDuration")), //Convert to number
            pauseDuration: Number(formData.get("experiment.pauseDuration")), //Convert to Number
            displayMethod: formData.get("experiment.displayMethod"),
            scoringMethod: formData.get("experiment.scoringMethod")
        }
    }

    //Map Uploaded Files
    function mapUploadedFiles(formData: FormData) {
        return {
            consentForm: formData.get("files.consentForm"),
            studyInstructions: formData.get("files.studyInstructions")
        }
    }

    //Map Configuration Settings
    function mapConfig(formData: FormData) {
        return {
            uploadedFiles: mapUploadedFiles(formData),
            learningPhase: mapLearning(formData),
            experimentPhase: mapExperiment(formData)
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
            setError(true);
            console.log(result.error.issues);
        }

        //If succesfully mapped
        if (result.success) {
            if (isError) setError(false);
            //Send the data to the backend
            uploadConfig.mutate(result.data, {
                onSuccess() {
                    //Use this to display a success message
                    console.log("SUCCESS!")
                }
            })
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center">
                <div className="flex flex-col min-h-screen items-center">
                    <h1 className="text-xl text-center font-bold py-4 text-stone-300">Configure Study</h1>

                    {/* Upload Section */}
                    <div className="flex flex-col items-start w-full px-10">
                        <h2 className="text-lg font-bold py-4 text-stone-300">Upload Files</h2>
                        <FileInput desc="Consent Form" name="files.consentForm"></FileInput>
                        <FileInput desc="Study Instructions" name="files.studyInstructions"></FileInput>
                    </div>
                    
                    {/* Experiment Phase */}
                    <ExperimentPhaseConfig header="Experiment Phase Configuration" />

                    {/* Action Buttons */}
                    <div className="flex flex-row justify-end w-full">
                        <button onClick={() => router.push("/")} className="bg-stone-700 hover:bg-stone-800 rounded-lg px-4 py-2 text-stone-300 mx-2">Cancel</button>
                        <button type="submit" className="bg-emerald-700 hover:bg-emerald-800 rounded-lg px-4 py-2 text-stone-300 mx-2">Save</button>
                    </div>
                </div>
            </div>
        </form>
    )
}