import { expect } from "@storybook/jest";
import { within, waitForElementToBeRemoved } from "@storybook/testing-library";

import { TagListWidget } from "./TagListWidget";
import { tagListErrorHandler, tagListSuccessHandler } from "src/mock";

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
  msw: [...tagListSuccessHandler],
};

TagListWidgetError.parameters = {
  msw: [...tagListErrorHandler],
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
