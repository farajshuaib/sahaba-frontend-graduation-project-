import { currentNetwork } from "./../constant/index";
import { toast } from "react-toastify";
import { ethers, Contract, utils, BigNumber } from "ethers";
import { networkParams } from "services/networks";

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
          address: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
          symbol: "ETH",
          decimals: 18,
        },
      },
    });
    toast.success("Token imported to metamask successfully");
  } catch (e) {
    toast.error("Token import failed");
  }
};

export const switchNetwork = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId:
              "0x" + (+networkParams[currentNetwork].chainId).toString(16),
          },
        ],
      });
      await setTimeout(() => {},100)
      resolve(true);
    } catch (err: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (err.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainName: networkParams[currentNetwork].networkName,
              chainId:
                "0x" + (+networkParams[currentNetwork].chainId).toString(16),
              nativeCurrency: networkParams[currentNetwork].nativeCurrency,
              rpcUrls: networkParams[currentNetwork].rpcUrls,
            },
          ],
        });
        await setTimeout(() => {},100)
        resolve(true);
      } else {
        toast.error(
          "Please switch to " + networkParams[currentNetwork].networkName
        );
        reject(err);
      }
    }
  });
};
