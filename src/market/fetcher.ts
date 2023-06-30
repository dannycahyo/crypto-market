import { baseTokenUrl, baseContentUrl } from "src/constant";

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
  const response = await fetch(
    `${baseTokenUrl}/api/proxy?path=wallet/supportedCurrencies`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  const currencies: Currency[] = data.payload;
  return currencies;
}

async function getPriceChanges(): Promise<PriceChange[]> {
  const response = await fetch(
    `${baseTokenUrl}/api/proxy?path=trade/price-changes`
  );

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
  const response = await fetch(
    `${baseContentUrl}/market-tags?language.name=${language}&_sort=order:${sort}`
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
  const response = await fetch(
    `${baseContentUrl}/market-tags?slug_eq=${slug}&language.name=${language}`
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
