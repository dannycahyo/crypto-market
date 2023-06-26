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

type TokenDetailByDate = {
  name: string;
  currencySymbol: string;
  logo: string;
  latestPrice: string;
  percentage: string;
};

type Language = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

type Icon = {
  id: number;
  name: string;
  hash: string;
  sha256: string | null;
  ext: string;
  mime: string;
  size: number;
  url: string;
  provider: string;
  provider_metadata: string | null;
  created_at: string;
  updated_at: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: string | null;
  previewUrl: string | null;
};

type ImageFormat = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
};

type Image = {
  id: number;
  name: string;
  hash: string;
  sha256: string | null;
  ext: string;
  mime: string;
  size: number;
  url: string;
  provider: string;
  provider_metadata: string | null;
  created_at: string;
  updated_at: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    small: ImageFormat;
    thumbnail: ImageFormat;
  };
  previewUrl: string | null;
};

type CurrencyMarketTag = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

type MarketTag = {
  id: number;
  title: string;
  subtitle: string;
  language: Language;
  url: string | null;
  published_at: string;
  created_at: string;
  updated_at: string;
  statusbar: string;
  order: number;
  slug: string;
  meta_title: string;
  meta_description: string;
  icon: Icon;
  image: Image;
  currencies: CurrencyMarketTag[];
};

export type {
  Wallet,
  Currency,
  PriceChange,
  TokenData,
  TokenDetailByDate,
  MarketTag,
  CurrencyMarketTag,
};
