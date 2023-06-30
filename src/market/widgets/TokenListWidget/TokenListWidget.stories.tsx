import { expect } from "@storybook/jest";
import { within, waitForElementToBeRemoved } from "@storybook/testing-library";

import { TokenListWidget } from "./TokenListWidget";
import { filterCurrenciesByMarketTagCurrency } from "src/market/utils";
import {
  SupportedCurrenciesTestData,
  TagDetailTestData,
  testSlug,
} from "src/constant";
import {
  currenciesAndPriceChangesErrorHandler,
  currenciesAndPriceChangesSuccessHandler,
  marketTagDetailErrorHandler,
  marketTagDetailSuccessHandler,
} from "src/mock";

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
  msw: [...currenciesAndPriceChangesSuccessHandler],
};

TokenListWidgetByMarketError.parameters = {
  msw: [...currenciesAndPriceChangesErrorHandler],
};

TokenListWidgetByMarketTagSuccess.parameters = {
  msw: [
    ...currenciesAndPriceChangesSuccessHandler,
    ...marketTagDetailSuccessHandler,
  ],
};

TokenListWidgetByMarketTagError.parameters = {
  msw: [
    ...currenciesAndPriceChangesErrorHandler,
    ...marketTagDetailErrorHandler,
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
      TagDetailTestData.currencies
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
