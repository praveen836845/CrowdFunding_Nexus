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
const taikoHekla = {
  id: 167009,  // Taiko Hekla testnet chain ID
  name: 'Taiko Hekla',
  iconUrl: 'https://raw.githubusercontent.com/taikoxyz/taiko-mono/main/packages/branding/default-favicon-32x32.png',
  iconBackground: '#fff',
  nativeCurrency: { 
    name: 'Ether', 
    symbol: 'ETH', 
    decimals: 18 
  },
  rpcUrls: {
    default: { http: ['https://rpc.hekla.taiko.xyz'] },
  },
  blockExplorers: {
    default: { 
      name: 'Taiko Explorer', 
      url: 'https://explorer.hekla.taiko.xyz' 
    },
  },
  // contracts: {
  //   multicall3: {
  //     address: '0xcA11bde05977b3631167028862bE2a173976CA11',
  //     blockCreated: 290, // Deployment block of multicall3 on Taiko Hekla
  //   },
  // },
  testnet: true
} 

const config = getDefaultConfig({
  appName: 'CrowdFunding',
  projectId: '6e07e06754f47c098482b57c96800295',
  chains: [taikoHekla],
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
