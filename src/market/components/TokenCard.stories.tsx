import { Meta, StoryFn } from "@storybook/react";

import { TokenCard } from "./TokenCard";

export default {
  title: "Market/Components/TokenCard",
  component: TokenCard,
} as Meta<typeof TokenCard>;

const Template: StoryFn<typeof TokenCard> = (args) => (
  <div className="h-32 w-32">
    <TokenCard {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  name: "Waves",
  percentage: "58.68",
  latestPrice: "37.199",
  logo: "https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_WAVES.svg",
  currencySymbol: "WAVES",
};

export const TruncatedTitle = Template.bind({});

TruncatedTitle.args = {
  name: "OMG Network",
  percentage: "11.68",
  latestPrice: "21.199",
  logo: "https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_OMG.svg",
  currencySymbol: "OMG",
};
