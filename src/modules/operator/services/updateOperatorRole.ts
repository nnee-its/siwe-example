import { api } from "@/config/api"
import { useMutation } from "@tanstack/react-query"
import { OperatorRole } from "../types/operator"

export function updateOperatorRole(walletAddress: string, role: OperatorRole) {
  return api.patch(`/operator/${walletAddress}/role`, { role })
}
export function useUpdateOperatorRole(walletAddress: string) {
  return useMutation({
    mutationFn: (role: OperatorRole) => updateOperatorRole(walletAddress, role),
  })
}
