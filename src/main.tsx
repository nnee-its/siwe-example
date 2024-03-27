import ScrollToTop from "@/components/ScrollToTop";
import Router from "@/routes";
import ThemeConfig from "@/theme";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import "simplebar";
import { WagmiProvider } from "wagmi";
import { queryClient } from "./config/queryClient";
import { wagmiConfig } from "./config/web3";

const App = (): JSX.Element => {
  return (
    <ThemeConfig>
      <ScrollToTop />
      <Router />
    </ThemeConfig>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <HelmetProvider>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <Toaster />
      </QueryClientProvider>
    </WagmiProvider>
  </HelmetProvider>,
);
