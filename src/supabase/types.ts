import {
  DeleteRequest,
  Fetch,
  FetchResponse,
  GetRequest,
  PatchRequest,
  PostRequest,
  PutRequest,
  ResponseBody,
} from "fetchmaki";

export type ClientArgs = {
  /** A reference ID of your supabase project. `xxx` in `https://xxx.supabase.co` */
  referenceId: string;
  /** Either anon/service role key of your project. */
  apiKey: string;
  /** Globally defines custom fetch client. Can be alternative fetches like `cross-fetch` and `node-fetch`.
   *  You can also configure in each method overwriting this configuration.
   */
  customFetch?: Fetch;
};

export type SEFClient = (config: ClientArgs) => {
  /** `GET` from your supabase functions. */
  get: SPGetFunction;
  /** `POST` to your supabase functions. */
  post: SPPostFunction;
  /** `PUT` to your supabase functions. */
  put: SPPutFunction;
  /** `PATCH` your supabase functions. */
  patch: SPPatchFunction;
  /** `DELETE` your supabase functions. (don't worry! it won't actually delete your functions!) */
  delete: SPDeleteFunction;
};

export type SPGetRequest = [endpoint: PostRequest[0], config?: GetRequest[1]];

export type SPGetFunction = <Data extends ResponseBody>(
  ...request: SPGetRequest
) => Promise<FetchResponse<Data>>;

export type SPPostRequest = [endpoint: PostRequest[0], config?: PostRequest[1]];

export type SPPostFunction = <Data extends ResponseBody>(
  ...request: SPPostRequest
) => Promise<FetchResponse<Data>>;

export type SPPutRequest = [endpoint: PutRequest[0], config?: PutRequest[1]];

export type SPPutFunction = (
  ...request: SPPutRequest
) => Promise<FetchResponse<undefined>>;

export type SPPatchRequest = [
  endpoint: PatchRequest[0],
  config?: PatchRequest[1]
];

export type SPPatchFunction = <Data extends ResponseBody>(
  ...request: SPPatchRequest
) => Promise<FetchResponse<Data>>;

export type SPDeleteRequest = [
  endpoint: DeleteRequest[0],
  config?: DeleteRequest[1]
];

export type SPDeleteFunction = <Data extends ResponseBody = undefined>(
  ...request: SPDeleteRequest
) => Promise<FetchResponse<Data>>;
