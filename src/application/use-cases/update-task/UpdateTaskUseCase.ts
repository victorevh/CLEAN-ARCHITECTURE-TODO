import { UpdateTaskDTO } from "@application/use-cases/update-task/UpdateTaskDTO";
import { inject, injectable } from "inversify";
import { HttpError } from "@interface/http/errors/HttpError";
import type { ITaskRepository } from "@domain/repositories/ITaskRepository";
import type { Task } from "@domain/entities/Task";
import type { IUpdateTaskUseCase } from "@application/use-cases/update-task/IUpdateTaskUseCase";
import TYPES from "@core/types";

@injectable()
export class UpdateTaskUseCase implements IUpdateTaskUseCase {
  constructor(
    @inject(TYPES.ITaskRepository)
    private taskRepository: ITaskRepository
  ) {}

  async execute(id: string, data: UpdateTaskDTO): Promise<void> {
    const task: Task | null = await this.taskRepository.findById(id);

    if (!task) {
      throw HttpError.notFound("Task not found");
    }

    const { title, description, completed } = data;

    const noFieldsProvided =
      title === undefined &&
      description === undefined &&
      completed === undefined;

    if (noFieldsProvided) {
      throw HttpError.badRequest(
        "At least one field must be provided to update."
      );
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

    task.updatedAt = new Date();

    await this.taskRepository.update(task);
  }
}
