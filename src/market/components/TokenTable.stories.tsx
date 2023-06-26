import { Meta, StoryFn } from "@storybook/react";

import { TokenTable } from "./TokenTable";

import { tokenData } from "../../constant";

export default {
  title: "Market/Components/TokenTable",
  component: TokenTable,
} as Meta<typeof TokenTable>;

const Template: StoryFn<typeof TokenTable> = (args) => <TokenTable {...args} />;

export const Default = Template.bind({});

Default.args = {
  data: tokenData,
  onFilterBy: (key: string) => console.log(key),
  onSortBy: (key?: "asc" | "desc") => console.log(key),
};
