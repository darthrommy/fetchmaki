import {
  ContentType,
  Fetch,
  FetchHeaders,
  FetchResponse,
  Json,
  Query,
  ResponseBody,
} from "./types";

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

/** handles parsing respone body by given `contentType`. */
const handleResBody = async (res: Response, contentType: ContentType) => {
  switch (contentType) {
    case "plain":
      return await res.text();
    case "html":
      return await res.text();
    case "text":
      return await res.text();
    case "json":
      return await res.json();
    case "noContent":
      return;
    default:
      throw new Error("Response body type is not supported");
  }
};

/** handles return value of `typedFetch` functions. Useful for creating wrappers of `typedFetch`. */
export const handleReturnValue = async <Data extends ResponseBody>(
  res: Response,
  contentType: ContentType
): Promise<FetchResponse<Data>> => {
  if (res.ok) {
    const body = await handleResBody(res, contentType);
    return {
      data: body,
      error: null,
      status: res.status,
      statusText: res.statusText,
      headers: res.headers,
    };
  } else {
    const body = await handleErrorBody(res);
    return {
      data: null,
      error: { message: body },
      status: res.status,
      statusText: res.statusText,
      headers: res.headers,
    };
  }
};

export const customFetch = (method: Fetch = fetch) => {
  return method;
};
