import { ITaskRepository } from "../../../domain/repositories/ITaskRepository";
import { ICompleteTaskUseCase } from "./ICompleteTaskUseCase";

export class CompleteTaskUseCase implements ICompleteTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(id: string): Promise<void> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new Error("Task not found");
    }

    task.completed = true;
    task.updatedAt = new Date();

    await this.taskRepository.update(task);
  }
}
