import { useQuery } from "@tanstack/react-query";

import {
  getSupportedCurrencies,
  getPriceChanges,
  getMarketTags,
  getMarketTagDetail,
} from "./fetcher";

import type { MarketTagDetailParams, MarketTagParams } from "./fetcher";
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

function useGetMarketTagDetail(
  { slug, language }: MarketTagDetailParams,
  options?: UseQueryOptions<MarketTag[]>
) {
  return useQuery<MarketTag[]>({
    queryKey: ["marketTagDetail", { slug, language }],
    queryFn: () => getMarketTagDetail({ slug, language }),
    ...options,
  });
}

export {
  useGetSupportedCurrencies,
  useGetPriceChanges,
  useGetMarketTags,
  useGetMarketTagDetail,
};
