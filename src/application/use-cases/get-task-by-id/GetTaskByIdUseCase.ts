import { ITaskRepository } from "../../../domain/repositories/ITaskRepository";
import { IGetTaskByIdUseCase } from "./IGetTaskByIdUseCase";
import { Task } from "../../../domain/entities/Task";

export class GetTaskByIdUseCase implements IGetTaskByIdUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(id: string): Promise<Task | null> {
    return this.taskRepository.findById(id);
  }
}
