import { Meta, StoryFn } from "@storybook/react";

import { MarketListScreen } from "./MarketListScreen";

export default {
  title: "Market/Screens/MarketListScreen",
  component: MarketListScreen,
} as Meta<typeof MarketListScreen>;

const Template: StoryFn<typeof MarketListScreen> = () => <MarketListScreen />;

export const Default = Template.bind({});
Default.args = {};
