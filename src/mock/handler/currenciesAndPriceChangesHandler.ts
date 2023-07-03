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
          week: (Math.random() * 200 - 100).toFixed(2),
          month: (Math.random() * 200 - 100).toFixed(2),
          year: (Math.random() * 200 - 100).toFixed(2),
        },
        {
          pair: "bch/idr",
          latestPrice: Math.floor(Math.random() * 10000000).toString(),
          day: (Math.random() * 200 - 100).toFixed(2),
          week: (Math.random() * 200 - 100).toFixed(2),
          month: (Math.random() * 200 - 100).toFixed(2),
          year: (Math.random() * 200 - 100).toFixed(2),
        },
        {
          pair: "eth/idr",
          latestPrice: Math.floor(Math.random() * 100000000).toString(),
          day: (Math.random() * 200 - 100).toFixed(2),
          week: (Math.random() * 200 - 100).toFixed(2),
          month: (Math.random() * 200 - 100).toFixed(2),
          year: (Math.random() * 200 - 100).toFixed(2),
        },
        {
          pair: "comp/idr",
          latestPrice: Math.floor(Math.random() * 100000000).toString(),
          day: (Math.random() * 200 - 100).toFixed(2),
          week: (Math.random() * 200 - 100).toFixed(2),
          month: (Math.random() * 200 - 100).toFixed(2),
          year: (Math.random() * 200 - 100).toFixed(2),
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
