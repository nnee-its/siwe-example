import { api } from "@/config/api"

export interface RefreshTokenRequest {
  refreshToken: string
}
export interface RefreshTokenResponse {
  accessToken: string
  refreshToken: string
}

export async function refreshToken(data: RefreshTokenRequest) {
  return (
    await api.post<RefreshTokenResponse>("/refresh-token", data, {
      headers: {
        Authorization: `Bearer ${data.refreshToken}`,
      },
    })
  ).data
}
