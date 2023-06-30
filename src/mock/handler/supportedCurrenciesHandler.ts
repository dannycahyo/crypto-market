import { rest } from "msw";
import { SupportedCurrenciesTestData, baseTokenUrl } from "src/constant";

const supportedCurrenciesSuccessHandler = [
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
];

const supportedCurrenciesErrorHandler = [
  rest.get(
    `${baseTokenUrl}/api/proxy?path=wallet/supportedCurrencies`,
    (_req, res, ctx) => {
      return res(ctx.delay(800), ctx.status(500));
    }
  ),
];

export { supportedCurrenciesSuccessHandler, supportedCurrenciesErrorHandler };
