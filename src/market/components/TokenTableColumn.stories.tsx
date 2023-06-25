import { Meta, StoryFn } from "@storybook/react";

import { TokenTableColumn } from "./TokenTableColumn";

export default {
  title: "Market/Components/TokenTableColumn",
  component: TokenTableColumn,
} as Meta<typeof TokenTableColumn>;

const Template: StoryFn<typeof TokenTableColumn> = (args) => (
  <TokenTableColumn {...args} />
);

export const Default = Template.bind({});

Default.args = {
  title: "HARGA",
  onUpButtonClick: () => {
    console.log("up");
  },
  onDownButtonClick: () => {
    console.log("down");
  },
};
