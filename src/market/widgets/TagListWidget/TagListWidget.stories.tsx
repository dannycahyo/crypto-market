import { rest } from "msw";
import { expect } from "@storybook/jest";
import { within, waitForElementToBeRemoved } from "@storybook/testing-library";

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

export const TagListWidgetSuccess = Template.bind({});
export const TagListWidgetError = Template.bind({});

TagListWidgetSuccess.parameters = {
  msw: [
    rest.get(
      `${process.env.STORYBOOK_PUBLIC_CONTENT_API}/market-tags?language.name=ID&_sort=order:ASC`,
      (_req, res, ctx) => {
        return res(ctx.json(TagListTestData));
      }
    ),
  ],
};

TagListWidgetError.parameters = {
  msw: [
    rest.get(
      `${process.env.STORYBOOK_PUBLIC_CONTENT_API}/market-tags?language.name=ID&_sort=order:ASC`,
      (_req, res, ctx) => {
        return res(ctx.delay(800), ctx.status(500));
      }
    ),
  ],
};

TagListWidgetSuccess.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  await step("wait for loading to be finished", async () => {
    await waitForElementToBeRemoved(() => canvas.queryByRole("progressbar"));
  });

  expect(
    canvas.getByRole("link", {
      name: "Terbaru Terbaru",
    })
  ).toBeInTheDocument();
};

TagListWidgetError.play = async ({ canvasElement, step }) => {
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
};
