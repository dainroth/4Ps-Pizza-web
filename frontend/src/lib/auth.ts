import api from "./api";

export interface AuthResponse {
  success: boolean;
  token?: string;
  message?: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: { name: string; email: string };
  message?: string;
}

export async function loginUser(
  email: string,
  password: string,
): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/user/login", { email, password });
  return res.data;
}

export async function registerUser(
  name: string,
  email: string,
  password: string,
): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/user/register", {
    name,
    email,
    password,
  });
  return res.data;
}
