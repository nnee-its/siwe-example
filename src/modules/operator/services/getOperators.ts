import { api } from "@/config/api"
import { PaginationRequest } from "@/types/request"
import { PaginationResponse } from "@/types/response"
import { useQuery } from "@tanstack/react-query"
import { Operator } from "../types/operator"

interface GetOperatorsRequest extends PaginationRequest {
  keyword?: string
}

export async function getOperators(params: GetOperatorsRequest) {
  return (await api.get<PaginationResponse<Operator>>("/operator", { params })).data
}
export function useGetOperators(params: GetOperatorsRequest) {
  return useQuery({
    queryKey: ["getOperators", params],
    queryFn: () => getOperators(params),
  })
}
