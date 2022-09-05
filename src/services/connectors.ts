import { InjectedConnector } from "@web3-react/injected-connector"; // Injected (e.g. Metamask)
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"; // Wallet Connect
import { WalletLinkConnector } from "@web3-react/walletlink-connector"; // Coinbase Wallet

const injected = new InjectedConnector({
  supportedChainIds: [137, 80001],
});

const walletconnect = new WalletConnectConnector({
  rpc: "https://polygon-rpc.com/",
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

const walletlink = new WalletLinkConnector({
  url: "https://polygon-rpc.com/",
  appName: "Spectrum",
});

export const connectors = {
  injected: injected,
  walletConnect: walletconnect,
  coinbaseWallet: walletlink,
};
