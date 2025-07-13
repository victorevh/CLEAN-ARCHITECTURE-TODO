import { inject, injectable } from "inversify";
import { CreateTaskUseCase } from "@application/use-cases/create-task/CreateTaskUseCase";
import { HttpError } from "@interface/http/errors/HttpError";
import { CreateTaskDTO } from "@application/use-cases/create-task/CreateTaskDTO";
import type { IController } from "@interface/http/protocols/IController";
import type { IHttpRequest } from "@interface/http/protocols/IHttpRequest";
import type { IHttpResponse } from "@interface/http/protocols/IHttpResponse";
import TYPES from "@core/types";

@injectable()
export class CreateTaskController implements IController {
  constructor(
    @inject(TYPES.CreateTaskUseCase)
    private readonly createTaskUseCase: CreateTaskUseCase
  ) {}

  async handle(req: IHttpRequest): Promise<IHttpResponse> {
    try {
      const result = await this.createTaskUseCase.execute(
        req.body as CreateTaskDTO
      );

      return {
        statusCode: 201,
        body: result,
      };
    } catch (error: unknown) {
      const httpError = HttpError.parse(error);

      return {
        statusCode: httpError.statusCode,
        body: httpError.toObject(),
      };
    }
  }
}
