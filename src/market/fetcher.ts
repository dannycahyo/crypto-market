import { Currency, PriceChange } from "./models";

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

export { getSupportedCurrencies, getPriceChanges };
