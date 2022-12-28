import { InjectedConnector } from "@web3-react/injected-connector"; // Injected (e.g. Metamask)
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"; // Wallet Connect
import { WalletLinkConnector } from "@web3-react/walletlink-connector"; // Coinbase Wallet

export const injected = new InjectedConnector({
  supportedChainIds: [1, 5],
});

const CoinbaseWallet = new WalletLinkConnector({
  url:
    window?.ethereum?.networkVersion == 5
      ? "https://goerli.infura.io/v3/" + import.meta.env.VITE_INFURA_KEY
      : "https://mainnet.infura.io/v3/" + import.meta.env.VITE_INFURA_KEY,
  appName: "SahabaNFT",
  supportedChainIds: [1, 5],
});

const walletConnect = new WalletConnectConnector({
  rpc: {
    5: "https://goerli.infura.io/v3/" + import.meta.env.VITE_INFURA_KEY,
    1: "https://mainnet.infura.io/v3/" + import.meta.env.VITE_INFURA_KEY,
  },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  supportedChainIds: [1, 5],
});

export const connectors = {
  injected,
  walletConnect,
  coinbaseWallet: CoinbaseWallet,
};
