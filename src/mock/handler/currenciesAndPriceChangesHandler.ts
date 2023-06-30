import { rest } from "msw";
import { SupportedCurrenciesTestData, baseTokenUrl } from "src/constant";

const currenciesAndPriceChangesSuccessHandler = [
  rest.get(`${baseTokenUrl}/api/proxy*`, (req, res, ctx) => {
    const params = req.url.searchParams;
    const path = params.get("path");

    if (path === "wallet/supportedCurrencies") {
      return res(
        ctx.json({
          payload: SupportedCurrenciesTestData,
        })
      );
    }

    if (path === "trade/price-changes") {
      // Notes* We need to put the test data here so that it could be different every time we call the mock API
      const PriceChangesTestData = [
        {
          pair: "btc/idr",
          latestPrice: Math.floor(Math.random() * 1000000000).toString(),
          day: (Math.random() * 200 - 100).toFixed(2),
          week: "3.35",
          month: "11.79",
          year: "54.90",
        },
        {
          pair: "bch/idr",
          latestPrice: Math.floor(Math.random() * 10000000).toString(),
          day: (Math.random() * 200 - 100).toFixed(2),
          week: "112.42",
          month: "165.23",
          year: "192.53",
        },
        {
          pair: "eth/idr",
          latestPrice: Math.floor(Math.random() * 100000000).toString(),
          day: (Math.random() * 200 - 100).toFixed(2),
          week: "0.85",
          month: "0.13",
          year: "73.69",
        },
        {
          pair: "comp/idr",
          latestPrice: Math.floor(Math.random() * 100000000).toString(),
          day: (Math.random() * 200 - 100).toFixed(2),
          week: "80.33",
          month: "48.65",
          year: "9.87",
        },
      ];
      return res(
        ctx.json({
          payload: PriceChangesTestData,
        })
      );
    }
  }),
];

const currenciesAndPriceChangesErrorHandler = [
  rest.get(`${baseTokenUrl}/api/proxy*`, (req, res, ctx) => {
    const params = req.url.searchParams;
    const path = params.get("path");

    if (path === "wallet/supportedCurrencies") {
      return res(ctx.delay(800), ctx.status(500));
    } else if (path === "trade/price-changes") {
      return res(ctx.delay(800), ctx.status(500));
    }
  }),
];

export {
  currenciesAndPriceChangesSuccessHandler,
  currenciesAndPriceChangesErrorHandler,
};
