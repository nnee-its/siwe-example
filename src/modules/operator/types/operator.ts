export enum OperatorRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  VIEWER = "VIEWER",
}

export interface Operator {
  walletAddress: string
  createdAt: Date
  updatedAt: Date
  isDeleted: boolean

  email: string
  name: string
  role: OperatorRole
}
