import { Operator } from "@/modules/operator/types/operator"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface OperatorState {
  operator?: Operator
  auth?: {
    accessToken: string
    refreshToken: string
  }
  setOperator(operator: Operator): void
  setAuth(auth: OperatorState["auth"]): void
  clear(): void
}

export const useOperator = create(
  persist<OperatorState>(
    (set) => ({
      setOperator: (operator: Operator) => set({ operator }),
      setAuth: (auth: OperatorState["auth"]) => set({ auth }),
      clear: () => set({ operator: undefined, auth: undefined }),
    }),
    {
      name: "operator",
    },
  ),
)
