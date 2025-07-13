import { inject, injectable } from "inversify";
import { CompleteTaskUseCase } from "@application/use-cases/complete-task/CompleteTaskUseCase";
import { HttpError } from "@interface/http/errors/HttpError";
import type { IController } from "@interface/http/protocols/IController";
import type { IHttpRequest } from "@interface/http/protocols/IHttpRequest";
import type { IHttpResponse } from "@interface/http/protocols/IHttpResponse";
import TYPES from "@core/types";

@injectable()
export class CompleteTaskController implements IController {
  constructor(
    @inject(TYPES.CompleteTaskUseCase)
    private readonly completeTaskUseCase: CompleteTaskUseCase
  ) {}

  async handle(req: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { id } = req.params as { id: string };

      if (!id) {
        throw HttpError.badRequest("Task ID is required.");
      }

      await this.completeTaskUseCase.execute(id);

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
