import { toast } from "react-toastify";
import { ethers, Contract, utils, BigNumber } from "ethers";

export const getBalance = async (address: string) => {
  if (!window?.ethereum) {
    toast.warning("you don't have metamask extension on your browser");
  }
  const provider = new ethers.providers.Web3Provider(window?.ethereum);
  const balance = await provider.getBalance(address);
  const balanceInEth = ethers.utils.formatEther(balance);
  return balanceInEth;
};





export const addTokenAsset = async () => {
  try {
    await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: environment.lockedToken.address,
          symbol: environment.lockedToken.id,
          decimals: 18,
        },
      },
    });
    toast.success("Token imported to metamask successfully");
  } catch (e) {
    toast.error("Token import failed");
  }
};

export const switchNetwork = async () => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x" + environment.networkId.toString(16) }],
    });
  } catch (err: any) {
    // This error code indicates that the chain has not been added to MetaMask
    if (err.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainName: environment.networkName,
            chainId: "0x" + environment.networkId.toString(16),
            nativeCurrency: {
              name: environment.networkMainToken,
              decimals: 18,
              symbol: environment.networkMainToken,
            },
            rpcUrls: [environment.rpcUrl],
          },
        ],
      });
    } else {
      toast.error("Please switch to " + environment.networkName);
      return false;
    }
  }
  return true;
};
