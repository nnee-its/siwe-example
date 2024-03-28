export interface PoolSocial {
  type: string
  url: string
}

export interface Pool {
  id: string
  createdAt: string
  updatedAt: string
  isDeleted: boolean

  projectName: string
  idoPrice: number
  totalRaise: number
  tokenName: string
  tokenNetwork: string
  idoNetwork: string
  socials: PoolSocial[]
  description: string
}
