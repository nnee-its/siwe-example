import { api } from "@/config/api"
import { useMutation } from "@tanstack/react-query"
import { CreatePoolRequest } from "./createPool"

export function updatePool(poolId: string, data: Partial<CreatePoolRequest>) {
  return api.patch(`/pool/${poolId}`, data)
}
export function useUpdatePool(poolId: string) {
  return useMutation({
    mutationFn: (data: Partial<CreatePoolRequest>) => updatePool(poolId, data),
  })
}
