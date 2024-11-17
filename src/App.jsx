import { ProSidebarProvider } from "react-pro-sidebar";
import React from "react";
import Routes from "./Routes";
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';


import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: 'CrowdFunding',
  projectId: '6e07e06754f47c098482b57c96800295',
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
});


function App() {
  return (
    <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
        <RainbowKitProvider showRecentTransactions={true} >
        <ProSidebarProvider>
        <ConnectButton />
        <Routes />
      </ProSidebarProvider>
      </RainbowKitProvider>
      </QueryClientProvider>
      </WagmiProvider>
  );
}

export default App;
