import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  DehydratedState,
} from "@tanstack/react-query";
import React from "react";

import "src/styles/globals.css";

import type { AppProps } from "next/app";

export type MainProps = {
  dehydratedState: DehydratedState;
};

export default function App({ Component, pageProps }: AppProps<MainProps>) {
  const { dehydratedState } = pageProps;
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}
