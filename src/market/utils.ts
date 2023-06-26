import { Currency, PriceChange, TokenData } from "./models";

function mergeCurrencyWithPriceChanges(
  supportedCurrencies?: Currency[],
  priceChangesData?: PriceChange[]
): TokenData[] {
  const priceChangesMap: Map<string, PriceChange> = new Map();

  priceChangesData?.forEach((priceChange) => {
    const currencySymbol = priceChange.pair.split("/")[0];
    priceChangesMap.set(currencySymbol, priceChange);
  });

  const mergedData = supportedCurrencies
    ?.map((currency) => {
      const priceChange = priceChangesMap.get(
        currency.currencySymbol.toLowerCase()
      );

      if (priceChange) {
        return {
          name: currency.name,
          currencySymbol: currency.currencySymbol,
          logo: currency.logo,
          latestPrice: priceChange.latestPrice,
          day: priceChange.day,
          week: priceChange.week,
          month: priceChange.month,
          year: priceChange.year,
        };
      } else {
        return;
      }
    })
    .filter(Boolean) as TokenData[];

  return mergedData;
}

export { mergeCurrencyWithPriceChanges };
