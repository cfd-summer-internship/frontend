//Map Learning Phase Settings
export function mapLearning(formData: FormData) {
    return {
        displayDuration: Number(formData.get("learning.displayDuration")), //Convert to number
        pauseDuration: Number(formData.get("learning.pauseDuration")), //Convert to Number
        displayMethod: formData.get("learning.displayMethod")
    }
}

//Map Wait Phase Settings
export function mapWait(formData: FormData) {
    return {
        duration: Number(formData.get("wait.duration"))
    };
}

//Map Experiment Phase Settings
export function mapExperiment(formData: FormData) {
    return {
        displayDuration: Number(formData.get("experiment.displayDuration")), //Convert to number
        pauseDuration: Number(formData.get("experiment.pauseDuration")), //Convert to Number
        displayMethod: formData.get("experiment.displayMethod"),
        scoringMethod: formData.get("experiment.scoringMethod")
    }
}

//Map Conclusion Phase Settings
export function mapConclusion(formData: FormData) {
    return {
        results: Boolean(formData.get("conclusion.results")),
        survey: Boolean(formData.get("conclusion.survey")),
        surveyQuestions: formData.getAll("survey.question")
    }
}

//Map Uploaded Files
export function mapUploadedFiles(formData: FormData) {
    const validateFile = (key:string) =>{
        //FILTERS OUT DUMMY FILES
        const file = formData.get(key);
        return file instanceof File && file.type !== "application/octet-stream"
        ? file
        : undefined;
}
    return {
        consentForm: validateFile("files.consentForm"),
        studyInstructions: validateFile("files.studyInstructions"),
        learningList: validateFile("files.learningList"),
        experimentList: validateFile("files.experimentList"),
        studyDebrief: validateFile("files.studyDebrief")
    }
}