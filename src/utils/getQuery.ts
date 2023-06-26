function getQuery(query: string[] | string | undefined, defaultValue: string) {
  return Array.isArray(query) ? query[0] : query ?? defaultValue;
}

export { getQuery };
