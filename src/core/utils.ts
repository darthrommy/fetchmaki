import { FetchHeaders, Json, Query } from "./types";

export const queryParser = (query: Query) => {
  const joined = new URLSearchParams(query).toString();
  return joined ? `?${joined}` : "";
};

export const handleErrorBody = async (res: Response) => {
  try {
    return await res.json();
  } catch {
    try {
      return await res.text();
    } catch {
      return;
    }
  }
};

/** add `content-type: application/json` to header if `body` is provided */
export const resolveReqHeaders = (args: {
  body?: Json;
  headers?: FetchHeaders;
}): FetchHeaders => {
  return {
    ...args.headers,
    ...(args.body ? { "content-type": "application/json" } : {}),
  };
};
