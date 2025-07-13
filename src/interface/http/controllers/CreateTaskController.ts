import { inject, injectable } from "inversify";
import { IController } from "@interface/http/protocols/IController";
import { IHttpRequest } from "@interface/http/protocols/IHttpRequest";
import { IHttpResponse } from "@interface/http/protocols/IHttpResponse";   
import { CreateTaskUseCase } from "@application/use-cases/create-task/CreateTaskUseCase";
import TYPES from "@core/types";

@injectable()
export class CreateTaskController implements IController {
  constructor(
    @inject(TYPES.CreateTaskUseCase)
    private readonly createTaskUseCase: CreateTaskUseCase
  ) {}

  async handle(req: IHttpRequest): Promise<IHttpResponse> {
    try {
      const result = await this.createTaskUseCase.execute(req.body);
      return {
        statusCode: 201,
        body: result,
      };
    } catch (err: any) {
      return {
        statusCode: 500,
        body: { error: err.message },
      };
    }
  }
}
