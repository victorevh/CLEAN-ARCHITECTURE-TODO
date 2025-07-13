import { inject, injectable } from "inversify";
import { IController } from "@interface/http/protocols/IController";
import { IHttpRequest } from "@interface/http/protocols/IHttpRequest";
import { IHttpResponse } from "@interface/http/protocols/IHttpResponse";
import { HttpError } from "@interface/http/errors/HttpError";
import TYPES from "@core/types";
import { UpdateTaskDTO } from "@application/use-cases/update-task/UpdateTaskDTO";
import type { IUpdateTaskUseCase } from "@application/use-cases/update-task/IUpdateTaskUseCase";

@injectable()
export class UpdateTaskController implements IController {
  constructor(
    @inject(TYPES.UpdateTaskUseCase)
    private readonly updateTaskUseCase: IUpdateTaskUseCase
  ) {}

  async handle(req: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { id } = req.params as { id: string };
      const updateData = req.body as UpdateTaskDTO;

      if (!id) {
        throw HttpError.badRequest("Task ID is required.");
      }

      await this.updateTaskUseCase.execute(id, updateData);

      return {
        statusCode: 204,
        body: null,
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
