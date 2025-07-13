import { ITaskRepository } from "@domain/repositories/ITaskRepository";
import { IGetTaskByIdUseCase } from "@application/use-cases/get-task-by-id/IGetTaskByIdUseCase";
import { Task } from "@domain/entities/Task";
import { injectable } from "inversify";

@injectable()
export class GetTaskByIdUseCase implements IGetTaskByIdUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(id: string): Promise<Task | null> {
    return this.taskRepository.findById(id);
  }
}
