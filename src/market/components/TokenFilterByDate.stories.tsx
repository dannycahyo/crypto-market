import { Meta, StoryFn } from "@storybook/react";

import { TokenFilterByDate } from "./TokenFilterByDate";

export default {
  title: "Market/Components/TokenFilterByDate",
  component: TokenFilterByDate,
} as Meta<typeof TokenFilterByDate>;

const Template: StoryFn<typeof TokenFilterByDate> = (args) => (
  <TokenFilterByDate {...args} />
);

export const Default = Template.bind({});

Default.args = {
  onFilterToken: (date) => {
    console.log(date);
  },
};
