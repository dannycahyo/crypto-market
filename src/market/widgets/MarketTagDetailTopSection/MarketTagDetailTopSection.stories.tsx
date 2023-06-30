import { expect } from "@storybook/jest";
import { within, waitForElementToBeRemoved } from "@storybook/testing-library";

import { MarketTagDetailTopSection } from "./MarketTagDetailTopSection";
import { TagDetailTestData, testSlug } from "src/constant";
import {
  marketTagDetailErrorHandler,
  marketTagDetailSuccessHandler,
} from "src/mock";

import type { Meta, StoryFn } from "@storybook/react";

type Story = typeof MarketTagDetailTopSection;

export default {
  title: "Market/Widgets/MarketTagDetailTopSection",
  component: MarketTagDetailTopSection,
} as Meta<Story>;

const Template: StoryFn<Story> = () => (
  <MarketTagDetailTopSection slug={testSlug.infrastructure} />
);

export const Default = Template.bind({});
Default.args = {};
export const MarketTagDetailTopSectionSuccess = Template.bind({});
export const MarketTagDetailTopSectionError = Template.bind({});

MarketTagDetailTopSectionSuccess.parameters = {
  msw: [...marketTagDetailSuccessHandler],
};

MarketTagDetailTopSectionError.parameters = {
  msw: [...marketTagDetailErrorHandler],
};

MarketTagDetailTopSectionSuccess.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  await step("wait for loading to be finished", async () => {
    await waitForElementToBeRemoved(() => canvas.queryByRole("progressbar"));
  });

  expect(
    canvas.getByRole("heading", {
      name: TagDetailTestData.title,
    })
  ).toBeInTheDocument();

  expect(
    canvas.getByText((content) => {
      const text = content.trim();
      const expectedText = TagDetailTestData.subtitle.trim();
      return text.includes(expectedText);
    })
  ).toBeInTheDocument();
};

MarketTagDetailTopSectionError.play = async ({ canvasElement, step }) => {
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
      "There is something wrong when getting the market tag detail content. Please try again later."
    )
  ).toBeInTheDocument();
};
