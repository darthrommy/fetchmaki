import { Query } from "../shared/query.js";

/** `typedFetch` interface */
export type TypedFetch = {
  /** Just do a `GET`. `config.contentType` is `json` by default. */
  get: GetFunction;

  /** Just do a `POST`. `config.contentType` is `json` by default. */
  post: PostFunction;

  /** Just do a `PUT`. No response body will be returned.
   * @see https://developer.mozilla.org/docs/Web/HTTP/Methods/PUT
   */
  put: PutFunction;

  /** Just do a `PATCH`. `config.contentType` is `json` by default. */
  patch: PatchFunction;

  /** Just do a `DELETE`. `config.contentType` is `noContent` by default. */
  delete: PostFunction;
};

/** content type */
export type ContentType = "json" | "plain" | "html" | "noContent";

/** headers type */
export type FetchHeaders = Record<string, string>;
export type Json = Record<
  string,
  string | number | boolean | { [key: string]: JSON } | Json[] | null
>;

/** body type */
export type ResponseBody = string | Json | undefined;

/** return type */
export type FetchResponse<Data extends ResponseBody> = {
  status: number;
  statusText: string;
  headers: Headers;
} & (FetchData<Data> | FetchError);

export type FetchData<Data extends ResponseBody> = {
  data: Data;
  error: null;
};

export type FetchError = {
  data: null;
  error: {
    message: unknown;
  };
};

export type FetchConfig = {
  headers?: FetchHeaders;
  query?: Query;
  body?: Json;
  contentType?: ContentType;
};

// get type
export type GetRequst = [url: string, config?: Omit<FetchConfig, "body">];

export type GetFunction = <Data extends ResponseBody>(
  ...args: GetRequst
) => Promise<FetchResponse<Data>>;

// post type
export type PostRequest = [url: string, config?: FetchConfig];

export type PostFunction = <Data extends ResponseBody>(
  ...args: PostRequest
) => Promise<FetchResponse<Data>>;

// put type
export type PutRequest = [
  url: string,
  config?: Omit<FetchConfig, "contentType">
];

export type PutFunction = (
  ...args: PutRequest
) => Promise<FetchResponse<undefined>>;

// patch type
export type PatchRequest = [url: string, config?: FetchConfig];

export type PatchFunction = <Data extends ResponseBody>(
  ...args: PatchRequest
) => Promise<FetchResponse<Data>>;

// delete type
export type DeleteRequest = [url: string, config?: FetchConfig];

export type DeleteFunction = <Data extends ResponseBody = undefined>(
  ...args: DeleteRequest
) => Promise<FetchResponse<Data>>;
