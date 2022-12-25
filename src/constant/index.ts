// https://goerli.etherscan.io/address/0xc67A001eE4Ffaa1C739Daf959e090A5855dc8318
import abi from "../contracts/abi.json";
import coin_abi from "../contracts/coin_abi.json";
//

export const currentNetwork: string =
  import.meta.env.VITE_DEV_MODE == "production" ? "1" : "5";
export const IPFS_BASE_URL: string = "https://ipfs.io/ipfs/";
export const WEBSITE_URL: string = "https://sahabanft.com.ly";

export const SAHABA_TEST_COIN_ADDRESS: string =
  "0x54460CC6574442b1ac12dd71C509Ac421E3Ab031";

export const CONTRACT_ADDRESS: string =
  "0xc67A001eE4Ffaa1C739Daf959e090A5855dc8318";
export const TEST_CONTRACT_ADDRESS: string =
  "0xc67A001eE4Ffaa1C739Daf959e090A5855dc8318";

export const TEST_CONTRACT_LINK = `https://goerli.etherscan.io/address/${CONTRACT_ADDRESS}`;
export const CONTRACT_ABI = abi;
export const SAHABA_TEST_COIN_ABI = coin_abi

export const CAPATCHA_SITE_KEY: string = import.meta.env.VITE_CAPATCHA_SITE_KEY;
export const CAPATCHA_SECRET_KEY: string = import.meta.env
  .VITE_CAPATCHA_SECRET_KEY;

export const FCM_vapidKey = import.meta.env.VITE_FCM_VAPID_KEY;

export const locales: SupportedLocales[] = [
  { key: "ar", value: "عربي" },
  { key: "en", value: "english" },
];

export const avatarColors = [
  "#ffdd00",
  "#fbb034",
  "#ff4c4c",
  "#c1d82f",
  "#f48924",
  "#7ac143",
  "#30c39e",
  "#06BCAE",
  "#0695BC",
  "#037ef3",
  "#146eb4",
  "#8e43e7",
  "#ea1d5d",
  "#fc636b",
  "#ff6319",
  "#e01f3d",
  "#a0ac48",
  "#00d1b2",
  "#472f92",
  "#388ed1",
  "#a6192e",
  "#4a8594",
  "#7B9FAB",
  "#1393BD",
  "#5E13BD",
  "#E208A7",
];

export const COLORS = [
  "bg-pink-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-red-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-gray-500",
];
