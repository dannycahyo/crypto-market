import { Meta, StoryFn } from "@storybook/react";

import { Skeleton } from "./Skeleton";

export default {
  title: "UI Kits/Components/Skeleton",
  component: Skeleton,
} as Meta<typeof Skeleton>;

const Template: StoryFn<typeof Skeleton> = () => <Skeleton />;

export const Default = Template.bind({});
