import { inject, injectable } from "inversify";
import { IController } from "@interface/http/protocols/IController";
import { IHttpRequest } from "@interface/http/protocols/IHttpRequest";
import { IHttpResponse } from "@interface/http/protocols/IHttpResponse";
import { ListTasksUseCase } from "@application/use-cases/list-tasks/ListTasksUseCase";
import { HttpError } from "@interface/http/errors/HttpError";
import TYPES from "@core/types";

@injectable()
export class ListTasksController implements IController {
  constructor(
    @inject(TYPES.ListTasksUseCase)
    private readonly listTasksUseCase: ListTasksUseCase
  ) {}

  async handle(req: IHttpRequest): Promise<IHttpResponse> {
    try {
      const tasks = await this.listTasksUseCase.execute();

      return {
        statusCode: 200,
        body: tasks,
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
