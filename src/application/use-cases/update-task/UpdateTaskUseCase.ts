import { ITaskRepository } from "../../../domain/repositories/ITaskRepository";
import { IUpdateTaskUseCase } from "./IUpdateTaskUseCase";
import { UpdateTaskDTO } from "./UpdateTaskDTO";
import type { Task } from "../../../domain/entities/Task";

export class UpdateTaskUseCase implements IUpdateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

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
