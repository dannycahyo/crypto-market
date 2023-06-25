type Wallet = {
  currencyGroup: string;
  tokenSymbol: string;
  decimal_point: number;
  tokenType: string;
  blockchain: string;
  explorer: string;
  listingDate: string;
  blockchainName: string;
  logo: string;
};

type Currency = {
  currencyGroup: string;
  color: string;
  currencySymbol: string;
  name: string;
  logo: string;
  decimal_point: number;
  listingDate: string;
  wallets: Wallet[];
};

type PriceChange = {
  pair: string;
  latestPrice: string;
  day: string;
  week: string;
  month: string;
  year: string;
};

type TokenData = {
  name: string;
  currencySymbol: string;
  logo: string;
} & Omit<PriceChange, "pair">;

export type { Wallet, Currency, PriceChange, TokenData };
