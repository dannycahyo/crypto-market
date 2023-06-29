import { Meta, StoryFn } from "@storybook/react";

import { GeneralError } from "./GeneralError";

export default {
  title: "UI Kits/Components/GeneralError",
  component: GeneralError,
} as Meta<typeof GeneralError>;

const Template: StoryFn<typeof GeneralError> = (args) => (
  <GeneralError {...args} />
);

export const Default = Template.bind({});

Default.args = {
  message: "There is something wrong with the server. Please try again later.",
};
