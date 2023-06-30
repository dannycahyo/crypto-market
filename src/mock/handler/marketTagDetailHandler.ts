import { rest } from "msw";
import { TagDetailTestData, testSlug } from "src/constant";

const marketTagDetailSuccessHandler = [
  rest.get(
    `${process.env.STORYBOOK_PUBLIC_CONTENT_API}/market-tags?slug_eq=${testSlug.layer1Slug}&language.name=$ID`,
    (_req, res, ctx) => {
      return res(ctx.json([TagDetailTestData]));
    }
  ),
];

const marketTagDetailErrorHandler = [
  rest.get(
    `${process.env.STORYBOOK_PUBLIC_CONTENT_API}/market-tags?slug_eq=${testSlug.layer1Slug}&language.name=$ID`,
    (_req, res, ctx) => {
      return res(ctx.delay(800), ctx.status(500));
    }
  ),
];

export { marketTagDetailSuccessHandler, marketTagDetailErrorHandler };
