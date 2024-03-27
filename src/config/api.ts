import { refreshToken } from "@/modules/auth/services/refreshToken"
import { useOperator } from "@/store/operator"
import axios, { AxiosError, AxiosHeaders } from "axios"
import toast from "react-hot-toast"
import { disconnect } from "wagmi/actions"
import { wagmiConfig } from "./web3"

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use((config) => {
  const accessToken = useOperator.getState().auth?.accessToken
  if (accessToken) (config.headers as AxiosHeaders).set("Authorization", `Bearer ${accessToken}`)
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config
    const auth = useOperator.getState().auth
    if (error.response?.status === 401 && config?.url !== "/auth/refresh-token") {
      if (auth?.refreshToken) {
        try {
          const data = await refreshToken({
            refreshToken: auth?.refreshToken,
          })
          useOperator.getState().setAuth(data)
          return api(config!)
        } catch (error) {
          toast.error("Session expired, please connect to wallet again")
          useOperator.getState().clear()
          disconnect(wagmiConfig)
        }
      } else {
        toast.error("Session expired, please connect to wallet again")
        useOperator.getState().clear()
        disconnect(wagmiConfig)
      }
    }
    return Promise.reject(error)
  },
)
