import { Meta, StoryFn } from "@storybook/react";

import { TagCard } from "./TagCard";

export default {
  title: "Market/Components/TagCard",
  component: TagCard,
} as Meta<typeof TagCard>;

const Template: StoryFn<typeof TagCard> = (args) => (
  <div className="w-24">
    <TagCard {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  iconURL:
    "https://s3.ap-southeast-1.amazonaws.com/content.pintu.co.id/Lending_f45b671bb7.svg",
  title: "Lending",
};
