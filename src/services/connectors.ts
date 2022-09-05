import { InjectedConnector } from "@web3-react/injected-connector"; // Injected (e.g. Metamask)
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"; // Wallet Connect
import { WalletLinkConnector } from "@web3-react/walletlink-connector"; // Coinbase Wallet

const injected = new InjectedConnector({
  supportedChainIds: [97, 56],
});

const walletconnect = new WalletConnectConnector({
  rpc: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

const walletlink = new WalletLinkConnector({
  url: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
  appName: "Spectrum",
});

export const connectors = {
  injected: injected,
  walletConnect: walletconnect,
  // coinbaseWallet: walletlink,
};
