import { api } from "@/config/api"
import { useMutation } from "@tanstack/react-query"
import { OperatorRole } from "../types/operator"

interface UpdateOperatorRoleRequest {
  role: OperatorRole
}

export function updateOperatorRole(data: UpdateOperatorRoleRequest) {
  return api.patch("/operator/role", data)
}
export function useUpdateOperatorRole() {
  return useMutation({
    mutationFn: updateOperatorRole,
  })
}
