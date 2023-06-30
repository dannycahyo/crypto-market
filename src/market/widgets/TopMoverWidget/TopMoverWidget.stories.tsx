import { rest } from "msw";
import { expect } from "@storybook/jest";
import { within, waitForElementToBeRemoved } from "@storybook/testing-library";

import { TopMoverWidget } from "./TopMoverWidget";
import { SupportedCurrenciesTestData, baseTokenUrl } from "src/constant";

import type { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Market/Widgets/TopMoverWidget",
  component: TopMoverWidget,
} as Meta<typeof TopMoverWidget>;

const Template: StoryFn<typeof TopMoverWidget> = () => <TopMoverWidget />;

export const Default = Template.bind({});
Default.args = {};

export const TopMoverWidgetSuccess = Template.bind({});
export const TopMoverWidgetError = Template.bind({});

TopMoverWidgetSuccess.parameters = {
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

TopMoverWidgetError.parameters = {
  msw: [
    rest.get(`${baseTokenUrl}/api/proxy*`, (req, res, ctx) => {
      const params = req.url.searchParams;
      const path = params.get("path");

      if (path === "wallet/supportedCurrencies") {
        return res(ctx.delay(800), ctx.status(500));
      } else if (path === "trade/price-changes") {
        return res(ctx.delay(800), ctx.status(500));
      }
    }),
  ],
};

TopMoverWidgetSuccess.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step("wait for loading to be finished", async () => {
    await waitForElementToBeRemoved(() => canvas.queryByRole("progressbar"), {
      timeout: 30000,
    });
  });

  for (const { name } of SupportedCurrenciesTestData) {
    await step(`check if ${name} is present`, async () => {
      const heading = await canvas.findByRole("heading", { name });
      expect(heading).toBeInTheDocument();
    });
  }
};

TopMoverWidgetError.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step("wait for loading to be finished", async () => {
    await waitForElementToBeRemoved(() => canvas.queryByRole("progressbar"), {
      timeout: 30000,
    });
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
