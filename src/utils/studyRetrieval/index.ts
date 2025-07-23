export const getStudyID = (async (studyCode: string) => {
    const res = await fetch(`/api/study/study_id/${studyCode}`, {
        method: "GET",
    });
    if (!res.ok) {
        throw new Error("Unable to Find Study")
    }
    return res.json()
});