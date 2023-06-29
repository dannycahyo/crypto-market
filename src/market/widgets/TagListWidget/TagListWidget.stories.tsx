import { rest } from "msw";
import { TagListWidget } from "./TagListWidget";

import { TagListTestData } from "src/constant";

import type { Meta, StoryFn } from "@storybook/react";

type Story = typeof TagListWidget;

export default {
  title: "Market/Widgets/TagListWidget",
  component: TagListWidget,
} as Meta<Story>;

const Template: StoryFn<Story> = () => <TagListWidget />;

export const Default = Template.bind({});
Default.args = {};

export const MockedSuccess = Template.bind({});
export const MockedError = Template.bind({});

MockedSuccess.parameters = {
  msw: [
    rest.get(
      `${process.env.STORYBOOK_PUBLIC_CONTENT_API}/market-tags?language.name=ID&_sort=order:ASC`,
      (_req, res, ctx) => {
        return res(ctx.json([TagListTestData]));
      }
    ),
  ],
};

MockedError.parameters = {
  msw: [
    rest.get(
      `${process.env.STORYBOOK_PUBLIC_CONTENT_API}/market-tags?language.name=ID&_sort=order:ASC`,
      (_req, res, ctx) => {
        return res(ctx.delay(800), ctx.status(403));
      }
    ),
  ],
};
