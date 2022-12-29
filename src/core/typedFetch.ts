import { TypedFetch } from "./types";
import { queryParser, resolveReqHeaders, handleReturnValue } from "./utils";

/** An wrapper of the Web Fetch API. Provides `get`, `post`, `put`, `patch` and `delete` functions. */
export const typedFetch: TypedFetch = {
  get: async (url, config) => {
    const headers = resolveReqHeaders({ ...config });
    const query = queryParser(config?.query ?? {});
    const res = await fetch(`${url}${query}`, { headers, method: "GET" });
    const contentType = config?.contentType ?? "json";
    return handleReturnValue(res, contentType);
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
    return handleReturnValue(res, contentType);
  },

  put: async (url, config) => {
    const headers = resolveReqHeaders({ ...config });
    const query = queryParser(config?.query ?? {});
    const res = await fetch(`${url}${query}`, {
      headers,
      method: "PUT",
      body: config?.body ? JSON.stringify(config.body) : undefined,
    });
    return handleReturnValue(res, "noContent");
  },

  patch: async (url, config) => {
    const headers = resolveReqHeaders({ ...config });
    const query = queryParser(config?.query ?? {});
    const res = await fetch(`${url}${query}`, {
      headers,
      method: "PATCH",
      body: config?.body ? JSON.stringify(config.body) : undefined,
    });
    const contentType = config?.contentType ?? "json";
    return handleReturnValue(res, contentType);
  },

  delete: async (url, config) => {
    const headers = resolveReqHeaders({ ...config });
    const query = queryParser(config?.query ?? {});
    const res = await fetch(`${url}${query}`, {
      headers,
      method: "DELETE",
      body: config?.body ? JSON.stringify(config.body) : undefined,
    });
    const contentType = config?.contentType ?? "noContent";
    return handleReturnValue(res, contentType);
  },
};
