import { api } from "@/config/api"
import { useMutation } from "@tanstack/react-query"
import { OperatorRole } from "../types/operator"

interface UpdateOperatorRoleRequest {
  walletAddress: string
  role: OperatorRole
}

export function updateOperatorRole({ walletAddress, role }: UpdateOperatorRoleRequest) {
  return api.patch(`/operator/${walletAddress}/role`, { role })
}
export function useUpdateOperatorRole() {
  return useMutation({
    mutationFn: updateOperatorRole,
  })
}
