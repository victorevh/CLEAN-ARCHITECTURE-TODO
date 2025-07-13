import type { IHttpRequest } from "./IHttpRequest";
import type { IHttpResponse } from "./IHttpResponse";

export interface IController {
  handle(req: IHttpRequest): Promise<IHttpResponse>;
}
