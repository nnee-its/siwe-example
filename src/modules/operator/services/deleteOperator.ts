import { api } from "@/config/api"
import { useMutation } from "@tanstack/react-query"

export function deleteOperator(walletAddress: string) {
  return api.delete(`/operator/${walletAddress}`)
}
export function useDeleteOperator() {
  return useMutation({
    mutationFn: deleteOperator,
  })
}
