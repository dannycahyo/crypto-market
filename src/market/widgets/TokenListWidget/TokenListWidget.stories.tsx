import { expect } from "@storybook/jest";
import {
  within,
  waitForElementToBeRemoved,
  userEvent,
} from "@storybook/testing-library";

import { TokenListWidget } from "./TokenListWidget";
import { filterCurrenciesByMarketTagCurrency } from "src/market/utils";
import {
  SupportedCurrenciesTestData,
  TagDetailTestData,
  testSlug,
} from "src/constant";
import {
  currenciesAndPriceChangesErrorHandler,
  currenciesAndPriceChangesSuccessHandler,
  marketTagDetailErrorHandler,
  marketTagDetailSuccessHandler,
} from "src/mock";

import type { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Market/Widgets/TokenListWidget",
  component: TokenListWidget,
} as Meta<typeof TokenListWidget>;

const Template: StoryFn<typeof TokenListWidget> = (args) => (
  <TokenListWidget {...args} />
);

export const Default = Template.bind({});
Default.args = {
  source: "market",
};

export const TokenListWidgetByMarketSuccess = Template.bind({});
export const TokenListWidgetByMarketError = Template.bind({});
export const TokenListWidgetByMarketTagSuccess = Template.bind({});
export const TokenListWidgetByMarketTagError = Template.bind({});

TokenListWidgetByMarketSuccess.args = {
  source: "market",
};

TokenListWidgetByMarketError.args = {
  source: "market",
};

TokenListWidgetByMarketTagSuccess.args = {
  source: "market-tag",
  slug: testSlug.layer1Slug,
};

TokenListWidgetByMarketTagError.args = {
  source: "market-tag",
  slug: testSlug.layer1Slug,
};

TokenListWidgetByMarketSuccess.parameters = {
  msw: [...currenciesAndPriceChangesSuccessHandler],
};

TokenListWidgetByMarketError.parameters = {
  msw: [...currenciesAndPriceChangesErrorHandler],
};

TokenListWidgetByMarketTagSuccess.parameters = {
  msw: [
    ...currenciesAndPriceChangesSuccessHandler,
    ...marketTagDetailSuccessHandler,
  ],
};

TokenListWidgetByMarketTagError.parameters = {
  msw: [
    ...currenciesAndPriceChangesErrorHandler,
    ...marketTagDetailErrorHandler,
  ],
};

TokenListWidgetByMarketSuccess.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step("wait for loading to be finished", async () => {
    await waitForElementToBeRemoved(
      () => canvas.queryAllByRole("progressbar"),
      {
        timeout: 30000,
      }
    );
  });

  for (const { name } of SupportedCurrenciesTestData) {
    await step(`check if ${name} is present`, async () => {
      const heading = await canvas.findByRole("heading", { name });
      expect(heading).toBeInTheDocument();
    });
  }

  const clickPriceColumnButton = async (name: string): Promise<void> => {
    const button = await canvas.findByRole("button", { name });
    userEvent.click(button);
  };

  const checkTokensOrder = async (
    order: "asc" | "desc" | "unsorted",
    defaultToken: (string | null)[]
  ): Promise<void> => {
    const tokenHeadings = await canvas.findAllByRole("heading", { level: 3 });
    const tokenState = await Promise.all(
      tokenHeadings
        .map((heading: HTMLElement) => heading.textContent)
        .filter((str) => str?.startsWith("Rp."))
    );

    const compareTokenPrices = (a: string, b: string) => {
      const priceA = parseFloat(a.replace("Rp. ", "").replace(",", ""));
      const priceB = parseFloat(b.replace("Rp. ", "").replace(",", ""));

      if (priceA < priceB) {
        return -1;
      }
      if (priceA > priceB) {
        return 1;
      }
      return 0;
    };

    const ascendingTokenPrices = [...defaultToken].sort((a, b) => {
      if (a && b) {
        return compareTokenPrices(a, b);
      }
      return 0;
    });

    const descendingTokenPrices = [...defaultToken].sort((a, b) => {
      if (a && b) {
        return compareTokenPrices(b, a);
      }
      return 0;
    });

    if (order === "desc") {
      tokenState.forEach((tokenPrice, index) => {
        expect(tokenPrice).toEqual(descendingTokenPrices[index]);
      });
    } else if (order === "asc") {
      tokenState.forEach((tokenPrice, index) => {
        expect(tokenPrice).toEqual(ascendingTokenPrices[index]);
      });
    } else if (order === "unsorted") {
      tokenState.forEach((tokenPrice, index) => {
        expect(tokenPrice).toEqual(defaultToken[index]);
      });
    }
  };

  const tokenHeadings = await canvas.findAllByRole("heading", { level: 3 });
  const defaultTokenPrices = tokenHeadings
    .map((heading: HTMLElement) => heading.textContent)
    .filter((str) => str?.startsWith("Rp."));

  await step(
    "click up icon button of latest price column section",
    async () => {
      await clickPriceColumnButton("descOrder Harga");
    }
  );

  await step(
    "check if tokens price are sorted by latest price in descending order",
    async () => {
      await checkTokensOrder("desc", defaultTokenPrices);
    }
  );

  await step(
    "click up icon button of latest price column section again",
    async () => {
      await clickPriceColumnButton("descOrder Harga");
    }
  );

  await step("check if tokens are back to unsorted state", async () => {
    await checkTokensOrder("unsorted", defaultTokenPrices);
  });

  await step(
    "click bottom icon button of latest price column section",
    async () => {
      await clickPriceColumnButton("ascOrder Harga");
    }
  );

  await step(
    "check if tokens are sorted by latest price in ascending order",
    async () => {
      await checkTokensOrder("asc", defaultTokenPrices);
    }
  );

  await step(
    "click bottom icon button of latest price column section again",
    async () => {
      await clickPriceColumnButton("ascOrder Harga");
    }
  );

  await step("check if tokens are back to unsorted state", async () => {
    await checkTokensOrder("unsorted", defaultTokenPrices);
  });
};

TokenListWidgetByMarketError.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  await step("wait for loading to be finished", async () => {
    await waitForElementToBeRemoved(
      () => canvas.queryAllByRole("progressbar"),
      {
        timeout: 30000,
      }
    );
  });

  expect(
    canvas.getByRole("alert", {
      name: "General Error",
    })
  ).toBeInTheDocument();

  expect(
    canvas.getByText(
      "There is something wrong when getting the token content. Please try again later."
    )
  ).toBeInTheDocument();
};

TokenListWidgetByMarketTagSuccess.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  await step("wait for loading to be finished", async () => {
    await waitForElementToBeRemoved(() => canvas.queryAllByRole("progressbar"));
  });

  const filteredSuppportedCurrenciesByMarketTagDetailCurrencies =
    filterCurrenciesByMarketTagCurrency(
      SupportedCurrenciesTestData,
      TagDetailTestData.currencies
    );

  for (const {
    name,
  } of filteredSuppportedCurrenciesByMarketTagDetailCurrencies) {
    await step(`check if ${name} is present`, async () => {
      const heading = await canvas.findByRole("heading", { name });
      expect(heading).toBeInTheDocument();
    });
  }
};

TokenListWidgetByMarketTagError.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  await step("wait for loading to be finished", async () => {
    await waitForElementToBeRemoved(
      () => canvas.queryAllByRole("progressbar"),
      {
        timeout: 30000,
      }
    );
  });

  expect(
    canvas.getByRole("alert", {
      name: "General Error",
    })
  ).toBeInTheDocument();

  expect(
    canvas.getByText(
      "There is something wrong when getting the token content. Please try again later."
    )
  ).toBeInTheDocument();
};
