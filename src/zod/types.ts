import {
  FetchConfig,
  FetchData,
  FetchResponse,
  ResponseBody,
} from "@darthrommy/fetches";
import { z } from "zod";

/** `zodFetch` interface. `application/json` is only allowed as an allowed response body type. */
export type ZodFetch = {
  /** Do a `GET` with zod validation. */
  get: ZGetFunction;
  /** Do a `POST` with zod validation. */
  post: ZPostFunction;
  /** Do a `PATCH` with zod validation. */
  patch: ZPatchFunction;
};

export type ObjectSchema = z.ZodObject<z.ZodRawShape>;

export type ZFResponse<
  Schema extends ObjectSchema,
  Data extends ResponseBody = z.infer<Schema>
> = Omit<FetchResponse<Data>, "data" | "error"> & (FetchData<Data> | ZFError);

export type ZFError = {
  data: null;
  error:
    | { type: "fetchError"; message: unknown }
    | { type: "zodError"; message: z.ZodError };
};

// GET
export type ZGetRequest<Schema extends ObjectSchema> = [
  url: string,
  config: Omit<FetchConfig, "body"> & {
    schema: Schema;
  }
];

export type ZGetFunction = <Schema extends ObjectSchema>(
  ...args: ZGetRequest<Schema>
) => Promise<ZFResponse<Schema>>;

// POST
export type ZPostRequest<Schema extends ObjectSchema> = [
  url: string,
  config: FetchConfig & { schema: Schema }
];

export type ZPostFunction = <Schema extends ObjectSchema>(
  ...args: ZPostRequest<Schema>
) => Promise<ZFResponse<Schema>>;

// PATCH
export type ZPatchRequest<Schema extends ObjectSchema> = [
  url: string,
  config: FetchConfig & { schema: Schema }
];

export type ZPatchFunction = <Schema extends ObjectSchema>(
  ...args: ZPatchRequest<Schema>
) => Promise<ZFResponse<Schema>>;
