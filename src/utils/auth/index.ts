import { LoginResponse, loginResponseModel } from "@/schemas/authSchemas";

export const getAuthToken = async ({
    username,
    password,
}: {
    username: string;
    password: string;
}): Promise<LoginResponse> => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    const res = await fetch("api/auth/jwt/login", {
        method: "POST",
        body: formData,
    });

    const json = await res.json()

    if (!res.ok) {
        throw new Error("Invalid Username or Password");
    }

    return loginResponseModel.parse(json);
};