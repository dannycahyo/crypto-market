import { expect } from "@storybook/jest";
import { within, waitForElementToBeRemoved } from "@storybook/testing-library";

import { TopMoverWidget } from "./TopMoverWidget";
import { SupportedCurrenciesTestData } from "src/constant";
import {
  currenciesAndPriceChangesErrorHandler,
  currenciesAndPriceChangesSuccessHandler,
} from "src/mock";

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
  msw: [...currenciesAndPriceChangesSuccessHandler],
};

TopMoverWidgetError.parameters = {
  msw: [...currenciesAndPriceChangesErrorHandler],
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
