import { createWeb3Modal } from "@web3modal/wagmi/react";
import { createConfig, http } from "wagmi";
import { bscTestnet } from "wagmi/chains";
import { walletConnect } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [bscTestnet],
  transports: {
    [bscTestnet.id]: http(),
  },
  connectors: [
    walletConnect({
      projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
    }),
  ],
});

createWeb3Modal({
  wagmiConfig: wagmiConfig,
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
});
