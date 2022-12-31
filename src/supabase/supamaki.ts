import { FetchHeaders, fetchmaki } from "fetchmaki";
import { Supamaki } from "./types";

/** add `authorization` header. Overrides your own `authorization`. */
const addAuthHeader = (
  authorization: string,
  baseHeader: FetchHeaders = {}
): FetchHeaders => {
  return { ...baseHeader, authorization };
};

/** client of `fetchmaki/supabase`.
 * @see https://rommy-docs.pages.dev/docs/fetchmaki/supabase
 */
export const supamaki: Supamaki = ({ referenceId, apiKey, customFetch }) => {
  const authorization = `Bearer ${apiKey}` as const;
  const baseUrl = `https://${referenceId}.functions.supabase.co` as const;
  return {
    get: async (endpoint, config) => {
      const headers = addAuthHeader(authorization, config?.headers);
      return fetchmaki.get(`${baseUrl}${endpoint}`, {
        customFetch,
        ...config, // overwrite global customFetch
        headers,
      });
    },

    post: async (endpoint, config) => {
      const headers = addAuthHeader(authorization, config?.headers);
      return fetchmaki.post(`${baseUrl}${endpoint}`, {
        customFetch,
        ...config,
        headers,
      });
    },

    put: async (endpoint, config) => {
      const headers = addAuthHeader(authorization, config?.headers);
      return fetchmaki.put(`${baseUrl}${endpoint}`, {
        customFetch,
        ...config,
        headers,
      });
    },

    patch: async (endpoint, config) => {
      const headers = addAuthHeader(authorization, config?.headers);
      return fetchmaki.patch(`${baseUrl}${endpoint}`, {
        customFetch,
        ...config,
        headers,
      });
    },

    delete: async (endpoint, config) => {
      const headers = addAuthHeader(authorization, config?.headers);
      return fetchmaki.delete(`${baseUrl}${endpoint}`, {
        customFetch,
        ...config,
        headers,
      });
    },
  };
};
