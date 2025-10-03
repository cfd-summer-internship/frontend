import { LoginResponse, loginResponseModel } from "@/schemas/authSchemas";
import { apiFetch } from "../api";

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

  const res = await apiFetch("api/auth/jwt/login", {
    method: "POST",
    body: formData,
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error("Invalid Username or Password");
  }

  return loginResponseModel.parse(json);
};

export const registerUser = async ({
  email,
  password,
  confirmPassword,
}: {
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  const res = await apiFetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, confirmPassword }),
  });

  const json = await res.json();

  if (!res.ok) {
    if (res.status === 400) {
      throw new Error("A user with this email already exists.");
    }
    throw new Error(`Registration failed`);
  }

  return json;
};

export const logout = async (token: string | undefined) => {
  const res = await apiFetch("/api/auth/jwt/logout", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error(`Error Logging Out`);
};
