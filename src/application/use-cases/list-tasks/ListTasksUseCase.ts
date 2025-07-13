import { IListTasksUseCase } from "@application/use-cases/list-tasks/IListTasksUseCase";
import { ITaskRepository } from "@domain/repositories/ITaskRepository";
import { Task } from "@domain/entities/Task";

export class ListTaksUseCase implements IListTasksUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(): Promise<Task[]> {
    return await this.taskRepository.findAll();
  }
}
