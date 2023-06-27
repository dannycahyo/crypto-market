import { Meta, StoryFn } from "@storybook/react";

import { MarketTagDetailTopSection } from "./MarketTagDetailTopSection";

export default {
  title: "Market/Widgets/MarketTagDetailTopSection",
  component: MarketTagDetailTopSection,
} as Meta<typeof MarketTagDetailTopSection>;

const Template: StoryFn<typeof MarketTagDetailTopSection> = () => (
  <MarketTagDetailTopSection slug="layer-1" />
);

export const Default = Template.bind({});
Default.args = {};
