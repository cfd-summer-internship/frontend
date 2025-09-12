export const getImageData = (async (token: string | undefined) => {
    const res = await fetch(`/api/images/get_file_page`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!res.ok) {
        throw new Error("Unable to Find Image Data")
    }
    const json = await res.json()

    return json.files
});

export const deleteImage = (async (token: string | undefined, filename: string) => {
    const res = await fetch(`/api/images/delete_file`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ filename })
    });

    if (!res.ok) {
        throw new Error("Unable to Delete File")
    }
    const json = await res.json()

    return json.files
});

export const uploadFile = (async (token: string | undefined, file: File) => {
    const formData = new FormData();
    formData.append('file', file);;

    const res = await fetch(`/api/images/upload`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    });

    if (!res.ok) {
        throw new Error("Unable to Upload File")
    }
    const json = await res.json()

    return json.files
});