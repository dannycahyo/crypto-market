import { Meta, StoryFn } from "@storybook/react";

import { Stat } from "./Stat";

export default {
  title: "UI Kits/Components/Stat",
  component: Stat,
} as Meta<typeof Stat>;

const Template: StoryFn<typeof Stat> = (args) => <Stat {...args} />;

export const Success = Template.bind({});

Success.args = {
  type: "success",
  label: "26.39",
  size: "medium",
};

export const Danger = Template.bind({});

Danger.args = {
  type: "danger",
  label: "26.39",
  size: "medium",
};
