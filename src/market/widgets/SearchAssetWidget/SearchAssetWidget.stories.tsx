import { Meta, StoryFn } from "@storybook/react";

import { SearchAssetWidget } from "./SearchAssetWidget";

export default {
  title: "Market/Widgets/SearchAssetWidget",
  component: SearchAssetWidget,
} as Meta<typeof SearchAssetWidget>;

const Template: StoryFn<typeof SearchAssetWidget> = () => <SearchAssetWidget />;

export const Default = Template.bind({});
Default.args = {};
