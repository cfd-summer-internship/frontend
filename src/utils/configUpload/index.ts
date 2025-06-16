import { ConfigSettings } from "@/schemas/studyConfigSchemas";

//Flattens data and maps it to FastAPI Parameters
function appendToFormData(formData:FormData,config:ConfigSettings){
    formData.append("learning_displayDuration", config.learningPhase.displayDuration.toString());
    formData.append("learning_pauseDuration", config.learningPhase.pauseDuration.toString());
    formData.append("learning_displayMethod",config.learningPhase.displayMethod);

    formData.append("configFiles_consentForm",config.uploadedFiles.consentForm);

};

//Fetch Request to API endpoint
export const uploadConfig = (async (config:ConfigSettings) => {
    const formData = new FormData();
    appendToFormData(formData,config);

    const res = await fetch(`/api/config/save`, {
        method: "POST",
        body: formData
});

    if (!res.ok) {
        throw new Error("Unable to Save Configuration")
    }

    return res.json()
});
