import { Meta, StoryFn } from "@storybook/react";

import { TagListWidget } from "./TagListWidget";

export default {
  title: "Market/Widgets/TagListWidget",
  component: TagListWidget,
} as Meta<typeof TagListWidget>;

const Template: StoryFn<typeof TagListWidget> = () => <TagListWidget />;

export const Default = Template.bind({});
Default.args = {};
