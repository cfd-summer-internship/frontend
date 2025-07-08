import { ConfigSettings } from "@/schemas/studyConfigSchemas";

//Flattens data and maps it to FastAPI Aliases
function appendToFormData(formData:FormData,config:ConfigSettings){
    console.log(formData)
    //Here we're explicitly mapping each value of the multipart/form-data
    //This ensures that each value is mapped correctly to the corresponding key
    //These keys will be the alias which we use when retrieving them on the backend

    //LEARNING PHASE
    formData.append("learning.displayDuration", config.learningPhase.displayDuration.toString());
    formData.append("learning.pauseDuration", config.learningPhase.pauseDuration.toString());
    formData.append("learning.displayMethod",config.learningPhase.displayMethod);
  
    //WAIT PHASE
    formData.append("wait.duration", config.waitPhase.duration.toString());

    //EXPERIMENT PHASE
    formData.append("experiment.displayDuration", config.experimentPhase.displayDuration.toString());
    formData.append("experiment.pauseDuration", config.experimentPhase.pauseDuration.toString());
    formData.append("experiment.displayMethod",config.experimentPhase.displayMethod);
    formData.append("experiment.scoringMethod",config.experimentPhase.scoringMethod);

    //CONCLUSION PHASE
    formData.append("conclusion.results",config.conclusionPhase.results.toString());
    formData.append("conclusion.survey",config.conclusionPhase.survey.toString());
    config.conclusionPhase.surveyQuestions?.forEach(question => {
        formData.append("survey.questions",question);
    });   

    //UPLOAD FILES
    formData.append("configFiles.consentForm",config.uploadedFiles.consentForm);
    formData.append("configFiles.studyInstructions",config.uploadedFiles.studyInstructions);
    formData.append("configFiles.studyDebrief", config.uploadedFiles.studyDebrief);
}
//Fetch Request to API endpoint
//Sends as multipart/form-data
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
