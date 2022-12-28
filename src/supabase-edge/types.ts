import {
  DeleteFunction,
  GetFunction,
  PatchFunction,
  PostFunction,
  PutFunction,
} from "@darthrommy/fetches";

export type ClientArgs = {
  /** A reference ID of your supabase project. `xxx` in `https://xxx.supabase.co` */
  referenceId: string;
  /** Either anon/service role key of your project. */
  apiKey: string;
};

export type SEFClient = (config: ClientArgs) => {
  /** `GET` from your supabase functions. */
  get: SPGetFunction;
  /** `POST` to your supabase functions. */
  post: SPPostFunction;
  /** `PUT` to your supabase functions. */
  put: SPPutFunction;
  /** `PATCH` your supabase functions. */
  patch: PatchFunction;
  /** `DELETE` your supabase functions. (don't worry! it won't actually delete your functions!) */
  delete: DeleteFunction;
};

export type SPGetFunction = GetFunction;

export type SPPostFunction = PostFunction;

export type SPPutFunction = PutFunction;

export type SPPatchFunction = PatchFunction;

export type SPDeleteFunction = DeleteFunction;
