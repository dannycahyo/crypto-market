import { Meta, StoryFn } from "@storybook/react";

import { MarketTagDetailScreen } from "./MarketTagDetailScreen";

export default {
  title: "Market/Screens/MarketTagDetailScreen",
  component: MarketTagDetailScreen,
} as Meta<typeof MarketTagDetailScreen>;

const Template: StoryFn<typeof MarketTagDetailScreen> = () => (
  <MarketTagDetailScreen slug="layer-1" />
);

export const Default = Template.bind({});
Default.args = {};
