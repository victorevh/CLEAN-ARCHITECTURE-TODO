import { inject, injectable } from "inversify";
import { HttpError } from "@interface/http/errors/HttpError";
import type { ITaskRepository } from "@domain/repositories/ITaskRepository";
import type { IDeleteTaskUseCase } from "@application/use-cases/delete-task/IDeleteTaskUseCase";
import TYPES from "@core/types";

@injectable()
export class DeleteTaskUseCase implements IDeleteTaskUseCase {
  constructor(
    @inject(TYPES.ITaskRepository)
    private taskRepository: ITaskRepository
  ) {}

  async execute(id: string): Promise<void> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw HttpError.notFound("Task not found");
    }

    await this.taskRepository.delete(id);
  }
}
