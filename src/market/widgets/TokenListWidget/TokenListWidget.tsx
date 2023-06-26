import { useState } from "react";
import {
  TokenDetailByDate,
  TokenTable,
  TokenFilterByDate,
} from "src/market/components";
import {
  useGetPriceChanges,
  useGetSupportedCurrencies,
} from "src/market/services";

import { mergeCurrencyWithPriceChanges } from "src/market/utils";
import { compose, curry } from "src/utils";

import { Skeleton } from "src/uikits";

import type { TokenData } from "src/market/models";

const TokenListWidget = () => {
  const { data: supportedCurrencies, isLoading: isLoadingSupportedCurrencies } =
    useGetSupportedCurrencies();
  const { data: priceChanges, isLoading: isLoadingPriceChanges } =
    useGetPriceChanges({
      refetchInterval: 1000,
    });

  const [sortByCategory, setSortByCategory] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">();
  const [selectedDate, setSelectedDate] = useState<string>("day");

  const curriedMergeCurrencyWithPriceChanges = curry(
    2,
    mergeCurrencyWithPriceChanges
  );

  const mergedCurrenciesByPriceChanges =
    curriedMergeCurrencyWithPriceChanges(supportedCurrencies);

  const sortingMergedCurrenciesWithPriceChange = (mergedData: TokenData[]) => {
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
  };

  const handleGettingTokenData = compose(
    sortingMergedCurrenciesWithPriceChange,
    mergedCurrenciesByPriceChanges
  );

  const tokenData = handleGettingTokenData(priceChanges) as TokenData[];

  const handleSelectedDate = (date: string) => {
    setSelectedDate(date);
  };

  const isLoadingTokenData = [
    isLoadingSupportedCurrencies,
    isLoadingPriceChanges,
  ].every(Boolean);

  const tokenDataByDate = tokenData?.map((token) => {
    return {
      name: token.name,
      currencySymbol: token.currencySymbol,
      logo: token.logo,
      latestPrice: token.latestPrice,
      percentage: token[selectedDate as keyof TokenData],
    };
  });

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
        <>
          <div className="hidden sm:block">
            <TokenTable
              data={tokenData}
              onFilterBy={(category) => setSortByCategory(category)}
              onSortBy={(order) => setSortOrder(order)}
            />
          </div>
          <div className="block sm:hidden">
            <TokenFilterByDate onFilterToken={handleSelectedDate} />
            {tokenDataByDate?.map((token) => (
              <TokenDetailByDate
                key={token.currencySymbol}
                name={token.name}
                currencySymbol={token.currencySymbol}
                logo={token.logo}
                latestPrice={token.latestPrice}
                percentage={token.percentage}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export { TokenListWidget };
