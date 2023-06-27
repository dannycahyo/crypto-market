import { Currency, MarketTag, PriceChange } from "./models";

type MarketTagParams = {
  language: string;
  sort: string;
};

type MarketTagDetailParams = {
  slug: string;
  language: string;
};

async function getSupportedCurrencies(): Promise<Currency[]> {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_BASE_URL_DEV
      : process.env.NEXT_PUBLIC_BASE_URL_PROD ??
        process.env.STORYBOOK_PUBLIC_BASE_URL_PROD;

  const response = await fetch(
    `${baseUrl}/api/proxy?path=wallet/supportedCurrencies`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  const currencies: Currency[] = data.payload;
  return currencies;
}

async function getPriceChanges(): Promise<PriceChange[]> {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_BASE_URL_DEV
      : process.env.NEXT_PUBLIC_BASE_URL_PROD ??
        process.env.STORYBOOK_PUBLIC_BASE_URL_PROD;

  const response = await fetch(`${baseUrl}/api/proxy?path=trade/price-changes`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  const priceChanges: PriceChange[] = data.payload;
  return priceChanges;
}

async function getMarketTags({
  language,
  sort,
}: MarketTagParams): Promise<MarketTag[]> {
  const baseUrl =
    process.env.NEXT_PUBLIC_CONTENT_API ??
    process.env.STORYBOOK_PUBLIC_BASE_URL_PROD;
  const response = await fetch(
    `${baseUrl}/market-tags?language.name=${language}&_sort=order:${sort}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
}

async function getMarketTagDetail({
  slug,
  language,
}: MarketTagDetailParams): Promise<MarketTag[]> {
  const baseUrl =
    process.env.NEXT_PUBLIC_CONTENT_API ??
    process.env.STORYBOOK_PUBLIC_BASE_URL_PROD;
  const response = await fetch(
    `${baseUrl}/market-tags?slug_eq=${slug}&language.name=${language}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
}

export type { MarketTagParams, MarketTagDetailParams };
export {
  getSupportedCurrencies,
  getPriceChanges,
  getMarketTags,
  getMarketTagDetail,
};
