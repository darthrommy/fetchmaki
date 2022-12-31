import { FetchHeaders, sushi } from "fetchmaki";
import { SEFClient } from "./types";

/** add `authorization` header. Overrides your own `authorization`. */
const addAuthHeader = (
  authorization: string,
  baseHeader: FetchHeaders = {}
): FetchHeaders => {
  return { ...baseHeader, authorization };
};

/** client of `fetchmaki/supabase`. BTW **sef** stands for ***S**upabase **E**dge **F**unctions*.
 * @see https://rommy-docs.pages.dev/docs/fetches/supabase
 */
export const sefClient: SEFClient = ({ referenceId, apiKey, customFetch }) => {
  const authorization = `Bearer ${apiKey}` as const;
  const baseUrl = `https://${referenceId}.functions.supabase.co` as const;
  return {
    get: async (endpoint, config) => {
      const headers = addAuthHeader(authorization, config?.headers);
      return sushi.get(`${baseUrl}${endpoint}`, {
        customFetch,
        ...config, // overwrite global customFetch
        headers,
      });
    },

    post: async (endpoint, config) => {
      const headers = addAuthHeader(authorization, config?.headers);
      return sushi.post(`${baseUrl}${endpoint}`, {
        customFetch,
        ...config,
        headers,
      });
    },

    put: async (endpoint, config) => {
      const headers = addAuthHeader(authorization, config?.headers);
      return sushi.put(`${baseUrl}${endpoint}`, {
        customFetch,
        ...config,
        headers,
      });
    },

    patch: async (endpoint, config) => {
      const headers = addAuthHeader(authorization, config?.headers);
      return sushi.patch(`${baseUrl}${endpoint}`, {
        customFetch,
        ...config,
        headers,
      });
    },

    delete: async (endpoint, config) => {
      const headers = addAuthHeader(authorization, config?.headers);
      return sushi.delete(`${baseUrl}${endpoint}`, {
        customFetch,
        ...config,
        headers,
      });
    },
  };
};
