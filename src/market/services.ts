import { useQuery } from "@tanstack/react-query";

import { getSupportedCurrencies, getPriceChanges } from "./fetcher";

import type { Currency, PriceChange } from "./models";
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

export { useGetSupportedCurrencies, useGetPriceChanges };
