//GET CONSENT FORM
export const getConsentForm = (async (study_id:string) => {
    const res = await fetch(`/api/study/consent_form/${study_id}`, {
        method: "GET"
});

    if (!res.ok) {
        throw new Error("Unable to Find Study")
    }

    const blob = await res.blob();
    return URL.createObjectURL(blob); 
});