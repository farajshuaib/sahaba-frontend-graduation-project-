
// contract url: https://mumbai.polygonscan.com/address/0x47c0e6E237f15301d26726eF82bB86cAAD40B22a#code
// contract address : 0x47c0e6E237f15301d26726eF82bB86cAAD40B22a


interface UserData {
  wallet_address: string;
  username: string;
  email: string;
  bio: string;
  facebook_url: string;
  website_url: string;
  twitter_url: string;
  telegram_url: string;
  profile_photo: string;
}

interface Meta {
  count: number;
  current: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
  current_page?: number;
}


interface Contract_NFT {
  tokenId: number;
  mintedBy: string; // address
  currentOwner: string; // address
  previousOwner: string; // address
  price: number;
  collection_id: number;
  numberOfTransfers: number;
}

interface Contract_methods {
  address: string;
  deployed: () => void;
  collectionName: string;
  collectionNameSymbol: string;
  createAndListToken: (tokenURI:string, price : number) => number; // tokenID
  buyToken: (tokenId: number) => void;
  changeTokenPrice: (tokenId: number, newPrice:number) => void; // you must be the owner of the token
  getListingPrice: () => number;
  setListingPrice: (newPrice: number) => number;
  getTokenOwner: (tokenId: number) => string;
  getTokenURI: (tokenId: number) => string;
  getTotalNumberOfTokensOwnedByAnAddress: (owner: string) => number;
  getTokenExists: (tokenId: number) => boolean
}