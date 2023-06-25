import { useState } from "react";
import { TokenTable } from "src/market/components";
import { Currency, PriceChange, TokenData } from "src/market/models";
import {
  useGetPriceChanges,
  useGetSupportedCurrencies,
} from "src/market/services";

import { Skeleton } from "src/uikits";

const TokenListWidget = () => {
  const { data: supportedCurrencies, isLoading: isLoadingSupportedCurrencies } =
    useGetSupportedCurrencies();
  const { data: priceChanges, isLoading: isLoadingPriceChanges } =
    useGetPriceChanges({
      refetchInterval: 1000,
    });

  const [sortByCategory, setSortByCategory] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">();

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

    if (sortByCategory && sortOrder) {
      mergedData.sort((a, b) => {
        const aValue = parseFloat(a[sortByCategory as keyof TokenData]);
        const bValue = parseFloat(b[sortByCategory as keyof TokenData]);

        if (sortOrder === "asc") {
          return aValue - bValue;
        } else {
          return bValue - aValue;
        }
      });
    }

    return mergedData;
  }

  const tokenData = mergeCurrencyWithPriceChanges(
    supportedCurrencies,
    priceChanges
  );

  const isLoadingTokenData = [
    isLoadingSupportedCurrencies,
    isLoadingPriceChanges,
  ].every(Boolean);

  return (
    <div>
      {isLoadingTokenData ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : (
        <TokenTable
          data={tokenData}
          onFilterBy={(category) => setSortByCategory(category)}
          onSortBy={(order) => setSortOrder(order)}
        />
      )}
    </div>
  );
};

export { TokenListWidget };
