import { rest } from "msw";
import { expect } from "@storybook/jest";
import {
  userEvent,
  within,
  waitForElementToBeRemoved,
} from "@storybook/testing-library";

import { SupportedCurrenciesTestData, baseTokenUrl } from "src/constant";
import { SearchAssetWidget } from "./SearchAssetWidget";

import type { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Market/Widgets/SearchAssetWidget",
  component: SearchAssetWidget,
} as Meta<typeof SearchAssetWidget>;

const Template: StoryFn<typeof SearchAssetWidget> = () => <SearchAssetWidget />;

export const Default = Template.bind({});
Default.args = {};
export const SearchAssetWidgetSuccess = Template.bind({});
export const SearchAssetWidgetError = Template.bind({});

SearchAssetWidgetSuccess.parameters = {
  msw: [
    rest.get(
      `${baseTokenUrl}/api/proxy?path=wallet/supportedCurrencies`,
      (_req, res, ctx) => {
        return res(
          ctx.json({
            payload: SupportedCurrenciesTestData,
          })
        );
      }
    ),
  ],
};

SearchAssetWidgetError.parameters = {
  msw: [
    rest.get(
      `${baseTokenUrl}/api/proxy?path=wallet/supportedCurrencies`,
      (_req, res, ctx) => {
        return res(ctx.delay(800), ctx.status(500));
      }
    ),
  ],
};

SearchAssetWidgetSuccess.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step("User see the input element and click it", async () => {
    const searchInput = canvas.getByRole("textbox", {
      name: "searchInput",
    });
    expect(searchInput).toBeInTheDocument();
    userEvent.click(searchInput);
    await waitForElementToBeRemoved(() => canvas.queryByRole("progressbar"), {
      timeout: 5000,
    });
  });

  await step("User filter currencies list by bitcoin keyword", async () => {
    userEvent.type(
      await canvas.findByRole(
        "textbox",
        {
          name: "searchInput",
        },
        { timeout: 5000 }
      ),
      "bitcoin"
    );

    const filteredCurrenciesByBitCoin = SupportedCurrenciesTestData.filter(
      ({ name }) => name !== "Ethereum"
    );

    {
      filteredCurrenciesByBitCoin.forEach(({ name }) => {
        expect(
          canvas.getByRole("listitem", {
            name,
          })
        ).toBeInTheDocument();
      });
    }
  });
};

SearchAssetWidgetError.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const searchInput = canvas.getByRole("textbox", {
    name: "searchInput",
  });
  expect(searchInput).toBeInTheDocument();

  userEvent.click(searchInput);
  await waitForElementToBeRemoved(() => canvas.queryByRole("progressbar"), {
    timeout: 30000,
  });

  expect(
    canvas.getByRole("alert", {
      name: "General Error",
    })
  ).toBeInTheDocument();
};
