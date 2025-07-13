import { inject, injectable } from "inversify";
import { GetTaskByIdUseCase } from "@application/use-cases/get-task-by-id/GetTaskByIdUseCase";
import { HttpError } from "@interface/http/errors/HttpError";
import type { IController } from "@interface/http/protocols/IController";
import type { IHttpRequest } from "@interface/http/protocols/IHttpRequest";
import type { IHttpResponse } from "@interface/http/protocols/IHttpResponse";
import TYPES from "@core/types";

@injectable()
export class GetTaskByIdController implements IController {
  constructor(
    @inject(TYPES.GetTaskByIdUseCase)
    private readonly getTaskByIdUseCase: GetTaskByIdUseCase
  ) {}

  async handle(req: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { id } = req.params as { id: string };

      if (!id) {
        throw HttpError.badRequest("Task ID is required.");
      }

      const task = await this.getTaskByIdUseCase.execute(id);

      return {
        statusCode: 200,
        body: task,
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
