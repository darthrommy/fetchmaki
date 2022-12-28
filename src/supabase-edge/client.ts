import { FetchHeaders, typedFetch } from "@darthrommy/fetches";
import { SEFClient } from "./types";

/** add `authorization` header. Overrides your own `authorization`. */
const addAuthHeader = (
  authorization: string,
  baseHeader: FetchHeaders = {}
): FetchHeaders => {
  return { ...baseHeader, authorization };
};

/** client of `@darthrommy/fetches/supabase`. BTW **sef** stands for ***S**upabase **E**dge **F**unctions*. */
export const sefClient: SEFClient = ({ referenceId, apiKey }) => {
  const authorization = `Bearer ${apiKey}` as const;
  const baseUrl = `https://${referenceId}.functions.supabase.co` as const;
  return {
    get: async (endpoint, config) => {
      const headers = addAuthHeader(authorization, config?.headers);
      return typedFetch.get(`${baseUrl}${endpoint}`, {
        ...config,
        headers,
      });
    },

    post: async (endpoint, config) => {
      const headers = addAuthHeader(authorization, config?.headers);
      return typedFetch.post(`${baseUrl}${endpoint}`, {
        ...config,
        headers,
      });
    },

    put: async (endpoint, config) => {
      const headers = addAuthHeader(authorization, config?.headers);
      return typedFetch.put(`${baseUrl}${endpoint}`, {
        ...config,
        headers,
      });
    },

    patch: async (endpoint, config) => {
      const headers = addAuthHeader(authorization, config?.headers);
      return typedFetch.patch(`${baseUrl}${endpoint}`, {
        ...config,
        headers,
      });
    },

    delete: async (endpoint, config) => {
      const headers = addAuthHeader(authorization, config?.headers);
      return typedFetch.delete(`${baseUrl}${endpoint}`, {
        ...config,
        headers,
      });
    },
  };
};
