import { useRouter } from "next/router";
import { useState } from "react";
import {
  TokenDetailByDate,
  TokenTable,
  TokenFilterByDate,
} from "src/market/components";
import {
  useGetMarketTagDetail,
  useGetPriceChanges,
  useGetSupportedCurrencies,
} from "src/market/services";

import { mergeCurrencyWithPriceChanges } from "src/market/utils";
import { compose, curry, getQuery } from "src/utils";

import { Skeleton } from "src/uikits";

import type { Currency, CurrencyMarketTag, TokenData } from "src/market/models";

type TokenListWidgetProps = {
  source: "market" | "market-tag";
  slug?: string;
};

const TokenListWidget = ({ source, slug }: TokenListWidgetProps) => {
  const { data: marketTags } = useGetMarketTagDetail(
    { language: "ID", slug: slug ?? "" },
    {
      enabled: source === "market-tag",
    }
  );
  const { data: supportedCurrencies, isLoading: isLoadingSupportedCurrencies } =
    useGetSupportedCurrencies();
  const { data: priceChanges, isLoading: isLoadingPriceChanges } =
    useGetPriceChanges({
      refetchInterval: 1000,
    });

  const [sortByCategory, setSortByCategory] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">();
  const [selectedDate, setSelectedDate] = useState<string>("day");

  const filterCurrenciesByMarketTagCurrency = (
    currencies?: Currency[],
    marketTagCurrencies?: CurrencyMarketTag[]
  ): Currency[] => {
    if (!currencies || !marketTagCurrencies) {
      return [];
    }

    const currencySymbols = new Set(
      marketTagCurrencies.map((marketTagCurrency) => marketTagCurrency.name)
    );

    return currencies.filter((currency) =>
      currencySymbols.has(currency.currencySymbol)
    );
  };

  const currencies =
    source === "market"
      ? supportedCurrencies
      : filterCurrenciesByMarketTagCurrency(
          supportedCurrencies,
          marketTags?.[0]?.currencies
        );

  const curriedMergeCurrenciesWithPriceChanges = curry(
    2,
    mergeCurrencyWithPriceChanges
  );

  const mergedCurrenciesByPriceChanges =
    curriedMergeCurrenciesWithPriceChanges(currencies);

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
