import { queryParser } from "@darthrommy/fetches/shared";
import {
  ContentType,
  FetchHeaders,
  FetchResponse,
  Json,
  ResponseBody,
  TypedFetch,
} from "./types.js";

/** handle response body on success */
const handleResBody = async (res: Response, contentType: ContentType) => {
  switch (contentType) {
    case "plain":
      return await res.text();
    case "html":
      return await res.text();
    case "json":
      return await res.json();
    case "noContent":
      return;
    default:
      throw new Error("Response body type is inacceptable");
  }
};

/** handle response body on error */
const handleErrorBody = async (res: Response) => {
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

const resolveReturnValue = async <Data extends ResponseBody>(
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

const resolveReqHeaders = (args: {
  body?: Json;
  headers?: FetchHeaders;
}): FetchHeaders => {
  return {
    ...args.headers,
    ...(args.body ? { "content-type": "application/json" } : {}),
  };
};

/** An wrapper of the Web Fetch API. Provides `get`, `post`, `put`, `patch` and `delete` functions. */
export const typedFetch: TypedFetch = {
  get: async (url, config) => {
    const headers = resolveReqHeaders({ ...config });
    const query = queryParser(config?.query ?? {});
    const res = await fetch(`${url}${query}`, { headers, method: "GET" });
    const contentType = config?.contentType ?? "json";
    return resolveReturnValue(res, contentType);
  },

  post: async (url, config) => {
    const headers = resolveReqHeaders({ ...config });
    const query = queryParser(config?.query ?? {});
    const res = await fetch(`${url}${query}`, {
      headers,
      method: "POST",
      body: config?.body ? JSON.stringify(config.body) : undefined,
    });
    const contentType = config?.contentType ?? "json";
    return resolveReturnValue(res, contentType);
  },

  put: async (url, config) => {
    const headers = resolveReqHeaders({ ...config });
    const query = queryParser(config?.query ?? {});
    const res = await fetch(`${url}${query}`, {
      headers,
      method: "PUT",
      body: config?.body ? JSON.stringify(config.body) : undefined,
    });
    return resolveReturnValue(res, "noContent");
  },

  patch: async (url, config) => {
    const headers = resolveReqHeaders({ ...config });
    const query = queryParser(config?.query ?? {});
    const res = await fetch(`${url}${query}`, {
      headers,
      method: "POST",
      body: config?.body ? JSON.stringify(config.body) : undefined,
    });
    const contentType = config?.contentType ?? "json";
    return resolveReturnValue(res, contentType);
  },

  delete: async (url, config) => {
    const headers = resolveReqHeaders({ ...config });
    const query = queryParser(config?.query ?? {});
    const res = await fetch(`${url}${query}`, {
      headers,
      method: "POST",
      body: config?.body ? JSON.stringify(config.body) : undefined,
    });
    const contentType = config?.contentType ?? "noContent";
    return resolveReturnValue(res, contentType);
  },
};
