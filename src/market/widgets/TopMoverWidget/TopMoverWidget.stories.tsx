import { Meta, StoryFn } from "@storybook/react";

import { TopMoverWidget } from "./TopMoverWidget";

export default {
  title: "Market/Widgets/TopMoverWidget",
  component: TopMoverWidget,
} as Meta<typeof TopMoverWidget>;

const Template: StoryFn<typeof TopMoverWidget> = () => <TopMoverWidget />;

export const Default = Template.bind({});
Default.args = {};
