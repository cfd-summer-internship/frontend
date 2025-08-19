import { StudyResponseList } from "@/schemas/studyResponseSchemas";

export const submitAnswers = (async (studyID:string, subjectID:string, answers: StudyResponseList) => {
    const res = await fetch(`/api/responses/${studyID}?subject_id=${subjectID}`, {
        method: "POST",
        body: JSON.stringify(answers)
    });

    if (!res.ok) {
        throw new Error("Unable to Save Configuration")
    }

    return res.json()
});