import { FetchHeaders, typedFetch } from "@darthrommy/fetches";
import { SEFClient } from "./types";

/** add `authorization` header. Overrides your own `authorization`. */
const addAuthHeader = (
  authorization: string,
  baseHeader: FetchHeaders = {}
): FetchHeaders => {
  return { ...baseHeader, authorization };
};

/** client of `@darthrommy/fetches/supabase`. BTW **sef** stands for ***S**upabase **E**dge **F**unctions*.
 * @see https://rommy-docs.pages.dev/docs/fetches/supabase
 */
export const sefClient: SEFClient = ({ referenceId, apiKey, customFetch }) => {
  const authorization = `Bearer ${apiKey}` as const;
  const baseUrl = `https://${referenceId}.functions.supabase.co` as const;
  return {
    get: async (endpoint, config) => {
      const headers = addAuthHeader(authorization, config?.headers);
      return typedFetch.get(`${baseUrl}${endpoint}`, {
        customFetch,
        ...config, // overwrite global customFetch
        headers,
      });
    },

    post: async (endpoint, config) => {
      const headers = addAuthHeader(authorization, config?.headers);
      return typedFetch.post(`${baseUrl}${endpoint}`, {
        customFetch,
        ...config,
        headers,
      });
    },

    put: async (endpoint, config) => {
      const headers = addAuthHeader(authorization, config?.headers);
      return typedFetch.put(`${baseUrl}${endpoint}`, {
        customFetch,
        ...config,
        headers,
      });
    },

    patch: async (endpoint, config) => {
      const headers = addAuthHeader(authorization, config?.headers);
      return typedFetch.patch(`${baseUrl}${endpoint}`, {
        customFetch,
        ...config,
        headers,
      });
    },

    delete: async (endpoint, config) => {
      const headers = addAuthHeader(authorization, config?.headers);
      return typedFetch.delete(`${baseUrl}${endpoint}`, {
        customFetch,
        ...config,
        headers,
      });
    },
  };
};
