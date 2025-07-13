export interface IHttpRequest<
  Body = unknown,
  Params extends Record<string, string> = Record<string, string>,
  Query extends Record<string, string | undefined> = Record<
    string,
    string | undefined
  >,
  Headers extends Record<string, string | undefined> = Record<
    string,
    string | undefined
  >
> {
  body?: Body;
  params?: Params;
  query?: Query;
  headers?: Headers;
}
