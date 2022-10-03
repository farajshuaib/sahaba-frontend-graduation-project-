import abi from "../contracts/abi.json"
// 

export const currentNetwork:string = "5";
export const IPFS_BASE_URL:string = "https://ipfs.io/ipfs/";
export const CONTRACT_ADDRESS:string = "0xf73C43F30Cab858b9cbcF282689EE685fb4f0082";
export const TEST_CONTRACT_LINK = `https://goerli.etherscan.io/address/${CONTRACT_ADDRESS}#code`
export const CONTRACT_ABI = abi
export const FCM_vapidKey = "BGgA_V7VWLw_wgYxTM8Hb1RL6u85Y9QlyqnZe0FQKJdqrcIs6WTXBoECljxptX119JivpHQg5gsvcCraDUOXk78"

export const  validNFTsTypes = ["image", "audio", "video"];
export const locales: SupportedLocales[] = [
    { key: "ar", value: "عربي" },
    { key: "en", value: "english" },
    { key: "fr", value: "france" },
  ];
// https://goerli.etherscan.io/address/0xf73C43F30Cab858b9cbcF282689EE685fb4f0082#code
