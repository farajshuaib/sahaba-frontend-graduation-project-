
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
  numberOfTransfers: number;
}

interface Contract_methods {
  address: string;
  deployed: () => void;
  collectionName: string;
  collectionNameSymbol: string;
  createAndListToken: (
    tokenURI: string,
    price: number,
    collection_id: number
  ) => number; // tokenID
  buyToken: (tokenId: number) => void;
  changeTokenPrice: (tokenId: number, newPrice: number) => void; // you must be the owner of the token
  getServiceFeesPrice: () => number;
  setServiceFeesPrice: (newPrice: number) => number;
  getTokenOwner: (tokenId: number) => string;
  getTokenURI: (tokenId: number) => string;
  getTotalNumberOfTokensOwnedByAnAddress: (owner: string) => number;
  getTokenExists: (tokenId: number) => boolean;
}

interface Category {
  id: number;
  name: string;
  icon: string;
  collections_count: number;
  nfts_count: number;
}

interface Transactions {
  id: number;
  from: UserData;
  to: UserData;
  price: number | string;
  created_at: Date
}
interface Nft {
  id: number;
  title: string;
  creator_address: string;
  description: string;
  file_path: string;
  file_type: 'image' | 'audio' | 'video';
  collection: Collection;
  creator: UserData;
  owner: UserData;
  price: number;
  like_count: number;
  is_for_sale: boolean;
  token_id: string;
  is_liked?: boolean;
  transactions: Transactions[],
  sale_end_at: Date,

}

interface Collection {
  id: number;
  banner_image: string;
  collection_token_id: number;
  description: string;
  facebook_url: string | null;
  instagram_url: string | null;
  is_sensitive_content: boolean;
  logo_image: string;
  name: string;
  telegram_url: string | null;
  twitter_url: string | null;
  website_url: string | null;
  nfts: Nft[];
  created_by: UserData,
  nfts_count: number
}

interface UserData {
  id: number;
  wallet_address: string;
  username: string;
  email: string;
  bio: string;
  facebook_url: string;
  website_url: string;
  twitter_url: string;
  telegram_url: string;
  profile_photo: string;
  is_verified: boolean;
  status: "enabled" | "pending";
  collections?: Collection[];
  followers?: Nft[];
  following?: Nft[];
  liked_nfts?: Nft[];
  nfts?: Nft[];
  is_followed?: boolean 
}
