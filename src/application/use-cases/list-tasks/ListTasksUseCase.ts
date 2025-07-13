import { IListTasksUseCase } from "@application/use-cases/list-tasks/IListTasksUseCase";
import { ITaskRepository } from "@domain/repositories/ITaskRepository";
import { Task } from "@domain/entities/Task";
import { injectable } from "inversify";

@injectable()
export class ListTasksUseCase implements IListTasksUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(): Promise<Task[]> {
    return await this.taskRepository.findAll();
  }
}
