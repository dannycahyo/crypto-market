import { rest } from "msw";
import { TagListTestData } from "src/constant";

const tagListSuccessHandler = [
  rest.get(
    `${process.env.STORYBOOK_PUBLIC_CONTENT_API}/market-tags?language.name=ID&_sort=order:ASC`,
    (_req, res, ctx) => {
      return res(ctx.json(TagListTestData));
    }
  ),
];

const tagListErrorHandler = [
  rest.get(
    `${process.env.STORYBOOK_PUBLIC_CONTENT_API}/market-tags?language.name=ID&_sort=order:ASC`,
    (_req, res, ctx) => {
      return res(ctx.delay(800), ctx.status(500));
    }
  ),
];

export { tagListSuccessHandler, tagListErrorHandler };
