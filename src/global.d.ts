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
