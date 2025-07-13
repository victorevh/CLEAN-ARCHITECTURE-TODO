import { ITaskRepository } from "../../../domain/repositories/ITaskRepository";
import { IDeleteTaskUseCase } from "./IDeleteTaskUseCase";

export class DeleteTaskUseCase implements IDeleteTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(id: string): Promise<void> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new Error("Task not found");
    }

    await this.taskRepository.delete(id);
  }
}
