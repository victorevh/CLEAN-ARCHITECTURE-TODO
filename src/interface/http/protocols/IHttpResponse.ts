export interface IHttpResponse<Body = unknown> {
  statusCode: number;
  body: Body;
}
