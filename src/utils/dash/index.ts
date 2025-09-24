export const fetchUserRole = async (token: string | undefined) => {
    const res = await fetch(`/api/user/role`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    if (!res.ok) {
        throw new Error("Unable to Find User")
    }
    return await res.json()
}