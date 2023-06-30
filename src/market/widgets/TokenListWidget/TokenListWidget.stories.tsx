import { rest } from "msw";
import { expect } from "@storybook/jest";
import { within, waitForElementToBeRemoved } from "@storybook/testing-library";

import { TokenListWidget } from "./TokenListWidget";
import { filterCurrenciesByMarketTagCurrency } from "src/market/utils";
import {
  SupportedCurrenciesTestData,
  TagDetailData,
  baseTokenUrl,
  testSlug,
} from "src/constant";

import type { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Market/Widgets/TokenListWidget",
  component: TokenListWidget,
} as Meta<typeof TokenListWidget>;

const Template: StoryFn<typeof TokenListWidget> = (args) => (
  <TokenListWidget {...args} />
);

export const Default = Template.bind({});
Default.args = {
  source: "market",
};

export const TokenListWidgetByMarketSuccess = Template.bind({});
export const TokenListWidgetByMarketError = Template.bind({});
export const TokenListWidgetByMarketTagSuccess = Template.bind({});
export const TokenListWidgetByMarketTagError = Template.bind({});

TokenListWidgetByMarketSuccess.args = {
  source: "market",
};

TokenListWidgetByMarketError.args = {
  source: "market",
};

TokenListWidgetByMarketTagSuccess.args = {
  source: "market-tag",
  slug: testSlug.layer1Slug,
};

TokenListWidgetByMarketTagError.args = {
  source: "market-tag",
  slug: testSlug.layer1Slug,
};

TokenListWidgetByMarketSuccess.parameters = {
  msw: [
    rest.get(`${baseTokenUrl}/api/proxy*`, (req, res, ctx) => {
      const params = req.url.searchParams;
      const path = params.get("path");

      if (path === "wallet/supportedCurrencies") {
        return res(
          ctx.json({
            payload: SupportedCurrenciesTestData,
          })
        );
      }

      if (path === "trade/price-changes") {
        // Notes* We need to put the test data here so that it could be different every time we call the mock API
        const PriceChangesTestData = [
          {
            pair: "btc/idr",
            latestPrice: Math.floor(Math.random() * 1000000000).toString(),
            day: (Math.random() * 200 - 100).toFixed(2),
            week: "3.35",
            month: "11.79",
            year: "54.90",
          },
          {
            pair: "bch/idr",
            latestPrice: Math.floor(Math.random() * 10000000).toString(),
            day: (Math.random() * 200 - 100).toFixed(2),
            week: "112.42",
            month: "165.23",
            year: "192.53",
          },
          {
            pair: "eth/idr",
            latestPrice: Math.floor(Math.random() * 100000000).toString(),
            day: (Math.random() * 200 - 100).toFixed(2),
            week: "0.85",
            month: "0.13",
            year: "73.69",
          },
          {
            pair: "comp/idr",
            latestPrice: Math.floor(Math.random() * 100000000).toString(),
            day: (Math.random() * 200 - 100).toFixed(2),
            week: "80.33",
            month: "48.65",
            year: "9.87",
          },
        ];
        return res(
          ctx.json({
            payload: PriceChangesTestData,
          })
        );
      }
    }),
  ],
};

TokenListWidgetByMarketError.parameters = {
  msw: [
    rest.get(`${baseTokenUrl}/api/proxy*`, (req, res, ctx) => {
      const params = req.url.searchParams;
      const path = params.get("path");

      if (path === "wallet/supportedCurrencies") {
        return res(ctx.delay(800), ctx.status(500));
      }

      if (path === "trade/price-changes") {
        return res(ctx.delay(800), ctx.status(500));
      }
    }),
  ],
};

TokenListWidgetByMarketTagSuccess.parameters = {
  msw: [
    rest.get(`${baseTokenUrl}/api/proxy*`, (req, res, ctx) => {
      const params = req.url.searchParams;
      const path = params.get("path");

      if (path === "wallet/supportedCurrencies") {
        return res(
          ctx.json({
            payload: SupportedCurrenciesTestData,
          })
        );
      }

      if (path === "trade/price-changes") {
        // Notes* We need to put the test data here so that it could be different every time we call the mock API
        const PriceChangesTestData = [
          {
            pair: "btc/idr",
            latestPrice: Math.floor(Math.random() * 1000000000).toString(),
            day: (Math.random() * 200 - 100).toFixed(2),
            week: "3.35",
            month: "11.79",
            year: "54.90",
          },
          {
            pair: "bch/idr",
            latestPrice: Math.floor(Math.random() * 10000000).toString(),
            day: (Math.random() * 200 - 100).toFixed(2),
            week: "112.42",
            month: "165.23",
            year: "192.53",
          },
          {
            pair: "eth/idr",
            latestPrice: Math.floor(Math.random() * 100000000).toString(),
            day: (Math.random() * 200 - 100).toFixed(2),
            week: "0.85",
            month: "0.13",
            year: "73.69",
          },
          {
            pair: "comp/idr",
            latestPrice: Math.floor(Math.random() * 100000000).toString(),
            day: (Math.random() * 200 - 100).toFixed(2),
            week: "80.33",
            month: "48.65",
            year: "9.87",
          },
        ];
        return res(
          ctx.json({
            payload: PriceChangesTestData,
          })
        );
      }
    }),
    rest.get(
      `${process.env.STORYBOOK_PUBLIC_CONTENT_API}/market-tags?slug_eq=${testSlug.layer1Slug}&language.name=$ID`,
      (_req, res, ctx) => {
        return res(ctx.json([TagDetailData]));
      }
    ),
  ],
};

TokenListWidgetByMarketTagError.parameters = {
  msw: [
    rest.get(`${baseTokenUrl}/api/proxy*`, (req, res, ctx) => {
      const params = req.url.searchParams;
      const path = params.get("path");

      if (path === "wallet/supportedCurrencies") {
        return res(ctx.delay(800), ctx.status(500));
      }

      if (path === "trade/price-changes") {
        return res(ctx.delay(800), ctx.status(500));
      }
    }),
    rest.get(
      `${process.env.STORYBOOK_PUBLIC_CONTENT_API}/market-tags?slug_eq=${testSlug.layer1Slug}&language.name=$ID`,
      (_req, res, ctx) => {
        return res(ctx.delay(800), ctx.status(500));
      }
    ),
  ],
};

TokenListWidgetByMarketSuccess.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  await step("wait for loading to be finished", async () => {
    await waitForElementToBeRemoved(() => canvas.queryAllByRole("progressbar"));
  });

  for (const { name } of SupportedCurrenciesTestData) {
    await step(`check if ${name} is present`, async () => {
      const heading = await canvas.findByRole("heading", { name });
      expect(heading).toBeInTheDocument();
    });
  }
};

TokenListWidgetByMarketError.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  await step("wait for loading to be finished", async () => {
    await waitForElementToBeRemoved(
      () => canvas.queryAllByRole("progressbar"),
      {
        timeout: 30000,
      }
    );
  });

  expect(
    canvas.getByRole("alert", {
      name: "General Error",
    })
  ).toBeInTheDocument();

  expect(
    canvas.getByText(
      "There is something wrong when getting the token content. Please try again later."
    )
  ).toBeInTheDocument();
};

TokenListWidgetByMarketTagSuccess.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  await step("wait for loading to be finished", async () => {
    await waitForElementToBeRemoved(() => canvas.queryAllByRole("progressbar"));
  });

  const filteredSuppportedCurrenciesByMarketTagDetailCurrencies =
    filterCurrenciesByMarketTagCurrency(
      SupportedCurrenciesTestData,
      TagDetailData.currencies
    );

  for (const {
    name,
  } of filteredSuppportedCurrenciesByMarketTagDetailCurrencies) {
    await step(`check if ${name} is present`, async () => {
      const heading = await canvas.findByRole("heading", { name });
      expect(heading).toBeInTheDocument();
    });
  }
};

TokenListWidgetByMarketTagError.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  await step("wait for loading to be finished", async () => {
    await waitForElementToBeRemoved(
      () => canvas.queryAllByRole("progressbar"),
      {
        timeout: 30000,
      }
    );
  });

  expect(
    canvas.getByRole("alert", {
      name: "General Error",
    })
  ).toBeInTheDocument();

  expect(
    canvas.getByText(
      "There is something wrong when getting the token content. Please try again later."
    )
  ).toBeInTheDocument();
};
