import { rest } from "msw";
import { expect } from "@storybook/jest";
import { within, waitForElementToBeRemoved } from "@storybook/testing-library";

import { MarketTagDetailTopSection } from "./MarketTagDetailTopSection";
import { TagDetailData, testSlug } from "src/constant";

import type { Meta, StoryFn } from "@storybook/react";

type Story = typeof MarketTagDetailTopSection;

const { infrastructure, layer1Slug } = testSlug;
export default {
  title: "Market/Widgets/MarketTagDetailTopSection",
  component: MarketTagDetailTopSection,
} as Meta<Story>;

const Template: StoryFn<Story> = () => (
  <MarketTagDetailTopSection slug={infrastructure} />
);

export const Default = Template.bind({});
Default.args = {};
export const MarketTagDetailTopSectionSuccess = Template.bind({});
export const MarketTagDetailTopSectionError = Template.bind({});

MarketTagDetailTopSectionSuccess.parameters = {
  msw: [
    rest.get(
      `${process.env.STORYBOOK_PUBLIC_CONTENT_API}/market-tags?slug_eq=${layer1Slug}&language.name=$ID`,
      (_req, res, ctx) => {
        return res(ctx.json([TagDetailData]));
      }
    ),
  ],
};

MarketTagDetailTopSectionError.parameters = {
  msw: [
    rest.get(
      `${process.env.STORYBOOK_PUBLIC_CONTENT_API}/market-tags?slug_eq=${layer1Slug}&language.name=$ID`,
      (_req, res, ctx) => {
        return res(ctx.delay(800), ctx.status(500));
      }
    ),
  ],
};

MarketTagDetailTopSectionSuccess.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  await step("wait for loading to be finished", async () => {
    await waitForElementToBeRemoved(() => canvas.queryByRole("progressbar"));
  });

  expect(
    canvas.getByRole("heading", {
      name: TagDetailData.title,
    })
  ).toBeInTheDocument();

  expect(
    canvas.getByText((content) => {
      const text = content.trim();
      const expectedText = TagDetailData.subtitle.trim();
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
