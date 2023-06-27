import { QueryClient, dehydrate } from "@tanstack/react-query";
import { MarketListScreen } from "src/market/screens";

import {
  getSupportedCurrencies,
  getPriceChanges,
  getMarketTags,
} from "src/market/fetcher";

import type { MainProps } from "./_app";
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps<MainProps> = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["supportedCurrencies"], () =>
    getSupportedCurrencies()
  );
  await queryClient.prefetchQuery(["priceChanges"], () => getPriceChanges());

  await queryClient.prefetchQuery(
    ["marketTags", { language: "ID", sort: "ASC" }],
    () => getMarketTags({ language: "ID", sort: "ASC" })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default MarketListScreen;
