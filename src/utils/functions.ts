import {
  CAPATCHA_SITE_KEY,
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
  currentNetwork,
  SAHABA_TEST_COIN_ABI,
  SAHABA_TEST_COIN_ADDRESS,
} from "./../constant";
import { toast } from "react-toastify";
import { ethers, Contract, utils, BigNumber } from "ethers";
import { networkParams } from "services/networks";
import { store } from "app/store";
import { t } from "i18next";
import { parseEther } from "ethers/lib/utils";
// import { Biconomy } from "@biconomy/mexa";

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
  if (!window?.ethereum) return
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
  if (!window?.ethereum) return
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
      await setTimeout(() => {}, 100);
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
        await setTimeout(() => {}, 100);
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

export const usdPrice = (nft_price: number): string => {
  const state = store.getState();
  const eth_price = state.general.ethPrice;

  if (!eth_price) return "";
  return `${(nft_price * eth_price).toFixed(2)} USD`;
};

export function copyToClipboard(value: string) {
  navigator.clipboard.writeText(value);
  toast.success(`${t("copied_success")}`);
}

export const checkCapatcha = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await window.grecaptcha.ready(async () => {
        const res = await window.grecaptcha.execute(CAPATCHA_SITE_KEY, {
          action: "submit",
        });
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const getUserSlug = (userData: UserData) => {
  return (
    userData?.username ||
    userData?.wallet_address.slice(0, 5) +
      "..." +
      userData?.wallet_address.slice(-5)
  );
};


const approveBuyItem = async (signer:any, account:string) => {
  const tokenContract = new Contract(
    SAHABA_TEST_COIN_ADDRESS,
    SAHABA_TEST_COIN_ABI,
    signer
  );

  const allowance = await tokenContract.allowance(
    account,
    SAHABA_TEST_COIN_ADDRESS
  );

  if (!Number(allowance)) {
    await tokenContract.approve(
      SAHABA_TEST_COIN_ADDRESS,
      parseEther("9999999999999999999999999999")
    );
  }
};

// export async function getContract() {
//   const biconomy = new Biconomy(window.ethereum as ExternalProvider, {
//     apiKey: "lCJ4DY8Ui.520c4126-91f6-4d0c-a3aa-278d5e523a0e",
//     // debug: true,
//     contractAddresses: [CONTRACT_ADDRESS], // list of contract address you want to enable gasless on
//   });

//   await biconomy.init();

//   // To create contract instances you can do:
//   const contractInstance = new Contract(
//     CONTRACT_ADDRESS,
//     CONTRACT_ABI,
//     biconomy.ethersProvider
//   );

//   return contractInstance;
// }
