import { api } from "@/config/api"
import { useMutation } from "@tanstack/react-query"

export function deletePool(poolId: string) {
  return api.delete(`/pool/${poolId}`)
}
export function useDeletePool() {
  return useMutation({
    mutationFn: deletePool,
  })
}
