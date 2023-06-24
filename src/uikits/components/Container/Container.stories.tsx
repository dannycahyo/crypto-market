import { Meta, StoryFn } from "@storybook/react";

import { Container } from "./Container";

export default {
  title: "UI Kits/Components/Container",
  component: Container,
} as Meta<typeof Container>;

const Template: StoryFn<typeof Container> = (args) => (
  <Container>{args.children}</Container>
);

export const Default = Template.bind({});
Default.args = {
  children: (
    <div className="prose">
      <h4>This is some content inside Container</h4>
    </div>
  ),
};
