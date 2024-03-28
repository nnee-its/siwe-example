import { api } from "@/config/api"
import { PaginationRequest } from "@/types/request"
import { PaginationResponse } from "@/types/response"
import { useQuery } from "@tanstack/react-query"
import { Pool } from "../types/pool"

interface GetPoolsRequest extends PaginationRequest {
  keyword?: string
}

export async function getPools(params: GetPoolsRequest) {
  return (await api.get<PaginationResponse<Pool>>("/pool", { params })).data
}
export function useGetPools(params: GetPoolsRequest) {
  return useQuery({
    queryKey: ["getPools", params],
    queryFn: () => getPools(params),
  })
}
