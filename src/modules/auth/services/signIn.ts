import { api } from "@/config/api";

export interface SignInRequest {
  signature: string;
  message: string;
}

export async function signIn(data: SignInRequest) {
  return await api.post("auth/sign-in", data);
}
