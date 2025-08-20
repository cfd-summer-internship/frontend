import { StudyResponseList } from "@/schemas/studyResponseSchemas";

export const submitAnswers = (async (configID:string, subjectID:string, answers: StudyResponseList) => {
    const body={
        "identity":{
            "config_id":configID,
            "subject_id":subjectID
        },
        "responses":answers
    }
    const res = await fetch(`/api/results/responses/`, {
        method: "POST",
        headers:{ "Content-Type": "application/json",},
        body: JSON.stringify(body)
    });

    if (!res.ok) {
        throw new Error("Unable to Save Configuration")
    }

    return res.json()
});