import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { initialize, mswDecorator } from "msw-storybook-addon";

import "../src/styles/globals.css";

import type { Preview } from "@storybook/react";

initialize();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => {
      const queryClient = new QueryClient();
      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    },
    mswDecorator,
  ],
};

export default preview;
