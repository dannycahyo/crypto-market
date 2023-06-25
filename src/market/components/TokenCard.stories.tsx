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
  title: "Waves",
  dayPercentage: 58.68,
  price: 37.199,
  imageURL:
    "https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_WAVES.svg",
};

export const TruncatedTitle = Template.bind({});

TruncatedTitle.args = {
  title: "OMG Network",
  dayPercentage: 11.68,
  price: 21.199,
  imageURL:
    "https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_OMG.svg",
};
