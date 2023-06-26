import { TokenCard } from "src/market/components";
import { TokenData } from "src/market/models";
import {
  useGetPriceChanges,
  useGetSupportedCurrencies,
} from "src/market/services";
import { Skeleton } from "src/uikits";
import { mergeCurrencyWithPriceChanges } from "src/market/utils";
import { compose, curry } from "src/utils";

import type { TokenDetailByDate } from "src/market/models";

const TopMoverWidget = () => {
  const { data: supportedCurrencies, isLoading: isLoadingSupportedCurrencies } =
    useGetSupportedCurrencies();
  const { data: priceChanges, isLoading: isLoadingPriceChanges } =
    useGetPriceChanges({
      refetchInterval: 1000,
    });

  const mapTopSixSortedCurrenciesWithPriceChangeByDay = (
    tokenData?: TokenData[]
  ) => {
    const tokenDataByDate = tokenData?.map((token) => {
      return {
        name: token.name,
        currencySymbol: token.currencySymbol,
        logo: token.logo,
        latestPrice: token.latestPrice,
        percentage: token["day"],
      };
    });

    return tokenDataByDate;
  };

  const getTopSixSortedCurrenciesWithPriceChangeByDay = (
    tokenData?: TokenData[]
  ) => {
    const topSix = tokenData?.slice(0, 6);
    return topSix;
  };

  const sortingMergedCurrenciesWithPriceChangeByDay = (
    tokenData?: TokenData[]
  ) => {
    const sortedTokenData = [...(tokenData ?? [])].sort((a, b) => {
      const aValue = Math.abs(Number(a.day));
      const bValue = Math.abs(Number(b.day));

      return bValue - aValue;
    });

    return sortedTokenData;
  };

  const curriedMergeCurrencyWithPriceChanges = curry(
    2,
    mergeCurrencyWithPriceChanges
  );

  const mergingCurrenciesWithPriceChanges =
    curriedMergeCurrencyWithPriceChanges(supportedCurrencies);

  const handleGettingTopMoverTokenData = compose(
    mapTopSixSortedCurrenciesWithPriceChangeByDay,
    getTopSixSortedCurrenciesWithPriceChangeByDay,
    sortingMergedCurrenciesWithPriceChangeByDay,
    mergingCurrenciesWithPriceChanges
  );

  const tokenData = handleGettingTopMoverTokenData(
    priceChanges
  ) as TokenDetailByDate[];

  const isLoadingTokenData = [
    isLoadingSupportedCurrencies,
    isLoadingPriceChanges,
  ].every(Boolean);

  return (
    <div className="py-4">
      <h2 className="mb-2 text-xl font-bold text-black">
        🔥Top Movers (24 JAM)
      </h2>
      {isLoadingTokenData ? (
        <Skeleton />
      ) : (
        <div className="overflow-x-auto whitespace-nowrap">
          <div className="flex gap-4 sm:grid sm:grid-cols-6 sm:gap-6">
            {tokenData?.map((token) => (
              <div className="flex-shrink-0" key={token.currencySymbol}>
                <TokenCard {...token} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { TopMoverWidget };
