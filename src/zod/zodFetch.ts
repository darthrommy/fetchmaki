import {
  handleErrorBody,
  queryParser,
  resolveReqHeaders,
} from "@darthrommy/fetches";
import { z } from "zod";
import { ZFResponse, ZodFetch } from "./types";

const handleResBody = async (res: Response, schema: z.ZodTypeAny) => {
  const body = await res.json();
  const parsed = schema.safeParse(body);
  return parsed;
};

const handleReturnValue = async <Schema extends z.ZodObject<z.ZodRawShape>>(
  res: Response,
  schema: Schema
): Promise<ZFResponse<Schema>> => {
  if (!res.ok) {
    const body = await handleErrorBody(res);
    return {
      data: null,
      error: {
        type: "fetchError",
        message: body,
      },
      status: res.status,
      statusText: res.statusText,
      headers: res.headers,
    };
  }

  const parsed = await handleResBody(res, schema);

  if (parsed.success) {
    return {
      data: parsed.data,
      error: null,
      status: res.status,
      statusText: res.statusText,
      headers: res.headers,
    };
  } else {
    return {
      data: null,
      error: {
        type: "zodError",
        message: parsed.error,
      },
      status: res.status,
      statusText: res.statusText,
      headers: res.headers,
    };
  }
};

/** An wrapper of the Web Fetch API with zod body validation. Provides `get`, `post`, `put`, `patch` and `delete` functions. */
export const zodFetch: ZodFetch = {
  get: async (url, config) => {
    const headers = resolveReqHeaders({ ...config });
    const query = queryParser(config.query ?? {});
    const res = await fetch(`${url}${query}`, { method: "GET", headers });
    return handleReturnValue(res, config.schema);
  },

  post: async (url, config) => {
    const headers = resolveReqHeaders({ ...config });
    const query = queryParser(config.query ?? {});
    const res = await fetch(`${url}${query}`, {
      method: "POST",
      headers,
      body: config.body ? JSON.stringify(config.body) : undefined,
    });
    return handleReturnValue(res, config.schema);
  },

  patch: async (url, config) => {
    const headers = resolveReqHeaders({ ...config });
    const query = queryParser(config.query ?? {});
    const res = await fetch(`${url}${query}`, {
      method: "POST",
      headers,
      body: config.body ? JSON.stringify(config.body) : undefined,
    });
    return handleReturnValue(res, config.schema);
  },
};
