import { wagmiConfig } from "@/config/web3"
import { useOperator } from "@/store/operator"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { SiweMessage } from "siwe"
import { Address } from "viem"
import { useAccount } from "wagmi"
import { signMessage } from "wagmi/actions"
import { signIn } from "../services/signIn"

function createSiweMessage(address: Address) {
  const domain = window.location.host
  const origin = window.location.origin

  const message = new SiweMessage({
    address,
    chainId: 1,
    domain,
    uri: origin,
    statement: "Sign in with Ethereum to the app.",
    version: "1",
  })
  return message.prepareMessage()
}

export default function Siwe() {
  const navigate = useNavigate()
  const account = useAccount()
  const { setAuth, setOperator, auth, operator } = useOperator()

  useEffect(() => {
    if (account.isConnected && account.address && !auth && !operator) {
      const message = createSiweMessage(account.address!)
      signMessage(wagmiConfig, {
        message,
      }).then((signature) =>
        signIn({
          signature,
          message,
        }).then(({ accessToken, refreshToken, operator }) => {
          setAuth({
            accessToken,
            refreshToken,
          })
          setOperator(operator)
          navigate("/dashboard/app")
        }),
      )
    }
  }, [account, auth, operator])

  return (
    <div className="flex justify-center">
      <w3m-button />
    </div>
  )
}
