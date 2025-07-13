import type { IHttpRequest } from "@interface/http/protocols/IHttpRequest";
import type { IHttpResponse } from "@interface/http/protocols/IHttpResponse";

export interface IController {
  handle(req: IHttpRequest): Promise<IHttpResponse>;
}
