import { Meta, StoryFn } from "@storybook/react";

import { TokenDetailByDate } from "./TokenDetailByDate";

export default {
  title: "Market/Components/TokenDetailByDate",
  component: TokenDetailByDate,
} as Meta<typeof TokenDetailByDate>;

const Template: StoryFn<typeof TokenDetailByDate> = (args) => (
  <TokenDetailByDate {...args} />
);

export const Default = Template.bind({});

Default.args = {
  name: "Bitcoin",
  currencySymbol: "BTC",
  logo: "https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_BTC.svg",
  latestPrice: "100000000",
  percentage: "15.95",
};
