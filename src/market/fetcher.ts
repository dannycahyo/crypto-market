import { Currency, MarketTag, PriceChange } from "./models";

type MarketTagParams = {
  language: string;
  sort: string;
};

async function getSupportedCurrencies(): Promise<Currency[]> {
  const response = await fetch(`/api/proxy?path=wallet/supportedCurrencies`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  const currencies: Currency[] = data.payload;
  return currencies;
}

async function getPriceChanges(): Promise<PriceChange[]> {
  const response = await fetch(`/api/proxy?path=trade/price-changes`);

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
    `${process.env.NEXT_PUBLIC_CONTENT_API}/market-tags?language.name=${language}&_sort=order:${sort}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
}

export type { MarketTagParams };
export { getSupportedCurrencies, getPriceChanges, getMarketTags };
