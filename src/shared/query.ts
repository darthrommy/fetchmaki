export type Query = Record<string, string>;

export const queryParser = (query: Query) => {
  const joined = new URLSearchParams(query).toString();
  return joined ? `?${joined}` : "";
};
