/** headers type */
export type FetchHeaders = Record<string, string>;

/** possible JSON type */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

/** fetch type */
export type Fetch = typeof fetch;

/** query type */
export type Query = Record<string, string>;

/** available content type. `plain` and `html` are deprecated. */
export type ContentType = "json" | "plain" | "html" | "noContent" | "text";

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

/** argument */
export type FetchConfig = {
  headers?: FetchHeaders;
  query?: Query;
  body?: Json;
  contentType?: ContentType;
  customFetch?: typeof fetch;
};

/** `typedFetch` interface */
export type Fetchmaki = {
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

// get type
export type GetRequest = [url: string, config?: Omit<FetchConfig, "body">];

export type GetFunction = <Data extends ResponseBody>(
  ...request: GetRequest
) => Promise<FetchResponse<Data>>;

// post type
export type PostRequest = [url: string, config?: FetchConfig];

export type PostFunction = <Data extends ResponseBody>(
  ...request: PostRequest
) => Promise<FetchResponse<Data>>;

// put type
export type PutRequest = [
  url: string,
  config?: Omit<FetchConfig, "contentType">
];

export type PutFunction = (
  ...request: PutRequest
) => Promise<FetchResponse<undefined>>;

// patch type
export type PatchRequest = [url: string, config?: FetchConfig];

export type PatchFunction = <Data extends ResponseBody>(
  ...request: PatchRequest
) => Promise<FetchResponse<Data>>;

// delete type
export type DeleteRequest = [url: string, config?: FetchConfig];

export type DeleteFunction = <Data extends ResponseBody = undefined>(
  ...request: DeleteRequest
) => Promise<FetchResponse<Data>>;
