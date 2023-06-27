import { Meta, StoryFn } from "@storybook/react";

import { TokenListWidget } from "./TokenListWidget";

export default {
  title: "Market/Widgets/TokenListWidget",
  component: TokenListWidget,
} as Meta<typeof TokenListWidget>;

const Template: StoryFn<typeof TokenListWidget> = (args) => (
  <TokenListWidget {...args} />
);

export const Markets = Template.bind({});
Markets.args = {
  source: "market",
};

export const MarketTag = Template.bind({});

MarketTag.args = {
  source: "market-tag",
  slug: "layer-1",
};
