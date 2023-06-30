const baseTokenUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BASE_URL_DEV
    : process.env.NEXT_PUBLIC_BASE_URL_PROD ??
      process.env.STORYBOOK_PUBLIC_BASE_URL_PROD;

const baseContentUrl =
  process.env.NEXT_PUBLIC_CONTENT_API ??
  process.env.STORYBOOK_PUBLIC_CONTENT_API;

export { baseTokenUrl, baseContentUrl };
