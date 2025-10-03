import { ConfigSettings } from "@/schemas/studyConfigSchemas";
import { apiFetch } from "../api";

//Flattens data and maps it to FastAPI Aliases
function appendToFormData(formData: FormData, config: ConfigSettings) {
    console.log(formData)
    //Here we're explicitly mapping each value of the multipart/form-data
    //This ensures that each value is mapped correctly to the corresponding key
    //These keys will be the alias which we use when retrieving them on the backend

    //LEARNING PHASE
    formData.append("learning.displayDuration", config.learningPhase.displayDuration.toString());
    formData.append("learning.pauseDuration", config.learningPhase.pauseDuration.toString());
    formData.append("learning.displayMethod", config.learningPhase.displayMethod);

    //WAIT PHASE
    formData.append("waiting.displayDuration", config.waitPhase.duration.toString());

    //EXPERIMENT PHASE
    formData.append("experiment.displayDuration", config.experimentPhase.displayDuration.toString());
    formData.append("experiment.pauseDuration", config.experimentPhase.pauseDuration.toString());
    formData.append("experiment.displayMethod", config.experimentPhase.displayMethod);
    formData.append("experiment.responseMethod", config.experimentPhase.scoringMethod);

    //CONCLUSION PHASE
    formData.append("conclusion.survey", config.conclusionPhase.survey.toString());

    //UPLOAD FILES
    formData.append("configFiles.consentForm", config.uploadedFiles.consentForm);
    formData.append("configFiles.studyInstructions", config.uploadedFiles.studyInstructions);
    formData.append("configFiles.learningList", config.uploadedFiles.learningList);
    formData.append("configFiles.experimentList", config.uploadedFiles.experimentList);
    if (config.uploadedFiles.studyDebrief) {
        formData.append("configFiles.studyDebrief", config.uploadedFiles.studyDebrief);
    }
}
//Fetch Request to API endpoint
//Sends as multipart/form-data
export const uploadConfig = (async (config: ConfigSettings, token:string | undefined) => {
    const formData = new FormData();
    appendToFormData(formData, config);

    const res = await apiFetch(`/api/config/save`, {
        method: "POST",
        body: formData,
        headers:{
            Authorization: `Bearer ${token}`
        }
    });

    if (!res.ok) {
        throw new Error("Unable to Save Configuration")
    }

    return res.json()
});

export const getStudyConfig = (async (studyID: string) => {
    const res = await apiFetch(`/api/study/export/${studyID}`, {
        method: "GET",
    });
    if (!res.ok) {
        throw new Error("Unable to Find Configruation")
    }
    return res.json()
});
