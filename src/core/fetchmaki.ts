import { Fetchmaki } from "./types";
import {
  queryParser,
  resolveReqHeaders,
  handleReturnValue,
  customFetch,
} from "./utils";

/** An wrapper of the Web Fetch API. Provides `get`, `post`, `put`, `patch` and `delete` functions. */
export const fetchmaki: Fetchmaki = {
  get: async (url, config) => {
    const headers = resolveReqHeaders({ ...config });
    const query = queryParser(config?.query ?? {});
    const fetcher = customFetch(config?.customFetch);
    const res = await fetcher(`${url}${query}`, {
      headers,
      method: "GET",
    });
    return handleReturnValue(res, config?.contentType ?? "json");
  },

  post: async (url, config) => {
    const headers = resolveReqHeaders({ ...config });
    const query = queryParser(config?.query ?? {});
    const fetcher = customFetch(config?.customFetch);
    const res = await fetcher(`${url}${query}`, {
      headers,
      method: "POST",
      body: config?.body ? JSON.stringify(config.body) : undefined,
    });
    return handleReturnValue(res, config?.contentType ?? "json");
  },

  put: async (url, config) => {
    const headers = resolveReqHeaders({ ...config });
    const query = queryParser(config?.query ?? {});
    const fetcher = customFetch(config?.customFetch);
    const res = await fetcher(`${url}${query}`, {
      headers,
      method: "PUT",
      body: config?.body ? JSON.stringify(config.body) : undefined,
    });
    return handleReturnValue(res, "noContent");
  },

  patch: async (url, config) => {
    const headers = resolveReqHeaders({ ...config });
    const query = queryParser(config?.query ?? {});
    const fetcher = customFetch(config?.customFetch);
    const res = await fetcher(`${url}${query}`, {
      headers,
      method: "PATCH",
      body: config?.body ? JSON.stringify(config.body) : undefined,
    });
    return handleReturnValue(res, config?.contentType ?? "json");
  },

  delete: async (url, config) => {
    const headers = resolveReqHeaders({ ...config });
    const query = queryParser(config?.query ?? {});
    const fetcher = customFetch(config?.customFetch);
    const res = await fetcher(`${url}${query}`, {
      headers,
      method: "DELETE",
      body: config?.body ? JSON.stringify(config.body) : undefined,
    });
    return handleReturnValue(res, config?.contentType ?? "noContent");
  },
};
