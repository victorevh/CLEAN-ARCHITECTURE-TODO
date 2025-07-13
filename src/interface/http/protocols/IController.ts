import { IHttpRequest } from "./IHttpRequest";
import { IHttpResponse } from "./IHttpResponse";

export interface IController {
  handle(req: IHttpRequest): Promise<IHttpResponse>;
}
