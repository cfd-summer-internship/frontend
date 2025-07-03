//GET CONSENT FORM
export const getFile = (async (studyID:string, file:string) => {
    const res = await fetch(`/api/study/${file}/${studyID}`, {
        method: "GET"
});

    if (!res.ok) {
        throw new Error("Unable to Find Study")
    }

    const blob = await res.blob();
    return URL.createObjectURL(blob); 
});