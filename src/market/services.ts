import { useQuery } from "@tanstack/react-query";

import {
  getSupportedCurrencies,
  getPriceChanges,
  getMarketTags,
} from "./fetcher";

import type { MarketTagParams } from "./fetcher";
import type { Currency, MarketTag, PriceChange } from "./models";
import type { UseQueryOptions } from "@tanstack/react-query";

function useGetSupportedCurrencies(options?: UseQueryOptions<Currency[]>) {
  return useQuery<Currency[]>({
    queryKey: ["supportedCurrencies"],
    queryFn: getSupportedCurrencies,
    ...options,
  });
}

function useGetPriceChanges(options?: UseQueryOptions<PriceChange[]>) {
  return useQuery<PriceChange[]>({
    queryKey: ["priceChanges"],
    queryFn: getPriceChanges,
    ...options,
  });
}

function useGetMarketTags(
  { language, sort }: MarketTagParams,
  options?: UseQueryOptions<MarketTag[]>
) {
  return useQuery<MarketTag[]>({
    queryKey: ["marketTags", { language, sort }],
    queryFn: () => getMarketTags({ language, sort }),
    ...options,
  });
}

export { useGetSupportedCurrencies, useGetPriceChanges, useGetMarketTags };
