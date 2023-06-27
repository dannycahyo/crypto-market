import { QueryClient, dehydrate } from "@tanstack/react-query";

import { MarketTagDetailScreen } from "src/market/screens";
import {
  getMarketTagDetail,
  getPriceChanges,
  getSupportedCurrencies,
} from "src/market/fetcher";
import { getQuery } from "src/utils";

import type { MainProps } from "../../../_app";
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps<MainProps> = async ({
  query,
}) => {
  const queryClient = new QueryClient();

  const slug = getQuery(query.slug, "");

  await queryClient.prefetchQuery(["supportedCurrencies"], () =>
    getSupportedCurrencies()
  );
  await queryClient.prefetchQuery(["priceChanges"], () => getPriceChanges());

  await queryClient.prefetchQuery(
    ["marketTagDetail", { slug, language: "ID" }],
    () => getMarketTagDetail({ slug, language: "ID" })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default MarketTagDetailScreen;
