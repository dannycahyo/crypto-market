import { Meta, StoryFn } from "@storybook/react";

import { CurrencyList } from "./CurrencyList";
import { SupportedCurrenciesTestData } from "src/constant";

export default {
  title: "Market/Components/CurrencyList",
  component: CurrencyList,
} as Meta<typeof CurrencyList>;

const Template: StoryFn<typeof CurrencyList> = (args) => (
  <ul>
    <CurrencyList {...args} />
  </ul>
);

export const Default = Template.bind({});

Default.args = {
  currencies: SupportedCurrenciesTestData,
};
