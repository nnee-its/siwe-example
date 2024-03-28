import { api } from "@/config/api"
import { useMutation } from "@tanstack/react-query"
import { PoolSocial } from "../types/pool"

export interface CreatePoolRequest {
  projectName: string
  idoPrice: number
  totalRaise: number
  tokenName: string
  tokenNetwork: string
  idoNetwork: string
  socials: PoolSocial[]
  description: string
}

export function createPool(data: CreatePoolRequest) {
  return api.post("/pool", data)
}
export function useCreatePool() {
  return useMutation({
    mutationFn: createPool,
  })
}
