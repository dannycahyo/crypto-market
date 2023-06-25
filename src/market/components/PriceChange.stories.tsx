import { useEffect, useState } from "react";
import { Meta, StoryFn } from "@storybook/react";

import { PriceChange } from "./PriceChange";

export default {
  title: "Market/Components/PriceChange",
  component: PriceChange,
} as Meta<typeof PriceChange>;

const Template: StoryFn<typeof PriceChange> = (args) => {
  const [price, setPrice] = useState(args.price);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomPrice = Math.floor(Math.random() * 10000000); // Generate a random price
      setPrice(randomPrice);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return <PriceChange {...args} price={price} />;
};

export const Default = Template.bind({});

Default.args = {
  price: 3579346,
};
