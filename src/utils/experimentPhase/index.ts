import { StudyResponseList } from "@/schemas/studyResponseSchemas";

export const submitAnswers = (async (studyID:string, subjectID:string, answers: StudyResponseList) => {
    const res = await fetch(`/api/results/responses/${studyID}?subject_id=${subjectID}`, {
        method: "POST",
        headers:{ "Content-Type": "application/json",},
        body: JSON.stringify(answers)
    });

    if (!res.ok) {
        throw new Error("Unable to Save Configuration")
    }

    return res.json()
});