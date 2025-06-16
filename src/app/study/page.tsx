"use client";

import { configurationSchema, ConfigSettings } from "@/schemas/studyConfigSchemas";
import { SyntheticEvent } from "react";


export default function StudyConfigPage() {

    //Map Learning Phase
    function mapLearning(formData: FormData) {
        return {
            displayDuration: formData.get("learning.displayDuration"),
            pauseDuration: formData.get("learning.pauseDuration"),
            displayMethod: formData.get("learning.displayMethod")
        }
    }

    //Map Uploaded Files
    function mapUploadedFiles(formData: FormData) {
        return {
            consentForm: formData.get("files.consentForm")
        }
    }

    //Map Configuration
    function mapConfig(formData: FormData) {
        return {
            uploadedFiles: mapUploadedFiles(formData),
            learningPhase: mapLearning(formData),
        }
    }

    function handleSubmit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        //Parse Config File
        const result = configurationSchema.safeParse(mapConfig(formData));
    }

        return (
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col min-h-screen items-center">
                    <h1 className="text-xl text-center font-bold py-4 text-stone-300">Configure Study</h1>
                    <div className="flex flex-col items-start w-full px-10">
                        <h2 className="text-lg font-bold py-4 text-stone-300">File Uploading</h2>
                    </div>
                </div>
            </form>
        )
    }