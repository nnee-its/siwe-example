import { api } from "@/config/api"
import { Operator } from "@/modules/operator/types/operator"

export interface SignInRequest {
  signature: string
  message: string
}
export interface SignInResponse {
  accessToken: string
  refreshToken: string
  operator: Operator
}

export async function signIn(data: SignInRequest) {
  return (await api.post<SignInResponse>("auth/sign-in", data)).data
}
