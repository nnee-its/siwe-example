import { wagmiConfig } from "@/config/web3";
import React, { useEffect } from "react";
import { SiweMessage } from "siwe";
import { Address } from "viem";
import { useAccount } from "wagmi";
import { signMessage } from "wagmi/actions";
import { signIn } from "../services/signIn";

function createSiweMessage(address: Address) {
  const domain = window.location.host;
  const origin = window.location.origin;

  const message = new SiweMessage({
    address,
    chainId: 1,
    domain,
    uri: origin,
    statement: "Sign in with Ethereum to the app.",
    version: "1",
  });
  return message.prepareMessage();
}

export default function Siwe() {
  const account = useAccount();

  useEffect(() => {
    if (account.isConnected && account.address) {
      const message = createSiweMessage(account.address!);
      signMessage(wagmiConfig, {
        message,
      }).then((signature) =>
        signIn({
          signature,
          message,
        }),
      );
    }
  }, [account]);

  return (
    <div className="h-screen flex justify-center items-center bg-black">
      <w3m-button />
    </div>
  );
}
