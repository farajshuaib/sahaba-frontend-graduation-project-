import { InjectedConnector } from "@web3-react/injected-connector"; // Injected (e.g. Metamask)
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"; // Wallet Connect
import { WalletLinkConnector } from "@web3-react/walletlink-connector"; // Coinbase Wallet

const injected = new InjectedConnector({
  supportedChainIds: [137, 80001]
});

const walletconnect = new WalletConnectConnector({
  rpc: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true
});

const walletlink = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  appName: "sky"
});

export const connectors = {
  injected: injected,
  walletConnect: walletconnect,
  coinbaseWallet: walletlink
};
