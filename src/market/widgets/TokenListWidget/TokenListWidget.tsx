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

import {
  filterCurrenciesByMarketTagCurrency,
  mergeCurrencyWithPriceChanges,
} from "src/market/utils";
import { compose, curry } from "src/utils";

import { GeneralError, Skeleton } from "src/uikits";

import type { TokenData } from "src/market/models";

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
  const {
    data: supportedCurrencies,
    isLoading: isLoadingSupportedCurrencies,
    isError: isErrorSupportedCurrencies,
  } = useGetSupportedCurrencies();
  const {
    data: priceChanges,
    isLoading: isLoadingPriceChanges,
    isError: isErrorPriceChanges,
  } = useGetPriceChanges({
    refetchInterval: 1000,
  });

  const [sortByCategory, setSortByCategory] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">();
  const [selectedDate, setSelectedDate] = useState<string>("day");

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

  const isErrorTokenData = [
    isErrorSupportedCurrencies,
    isErrorPriceChanges,
  ].some(Boolean);

  const tokenDataByDate = tokenData?.map((token) => {
    return {
      name: token.name,
      currencySymbol: token.currencySymbol,
      logo: token.logo,
      latestPrice: token.latestPrice,
      percentage: token[selectedDate as keyof TokenData],
    };
  });

  if (isLoadingTokenData)
    return (
      <>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </>
    );

  if (isErrorTokenData)
    return (
      <GeneralError message="There is something wrong when getting the token content. Please try again later." />
    );

  return (
    <div>
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
    </div>
  );
};

export { TokenListWidget };
