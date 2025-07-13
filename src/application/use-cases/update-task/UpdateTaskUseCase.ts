import { ITaskRepository } from "@domain/repositories/ITaskRepository";
import { IUpdateTaskUseCase } from "@application/use-cases/update-task/IUpdateTaskUseCase";
import { UpdateTaskDTO } from "@application/use-cases/update-task/UpdateTaskDTO";
import type { Task } from "@domain/entities/Task";
import { inject, injectable } from "inversify";
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
      throw new Error("Task not found");
    }

    if (data.title !== undefined) task.title = data.title;
    if (data.description !== undefined) task.description = data.description;
    if (data.completed !== undefined) task.completed = data.completed;

    task.updatedAt = new Date();

    await this.taskRepository.update(task);
  }
}
