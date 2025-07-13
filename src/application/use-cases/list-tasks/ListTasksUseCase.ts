import { IListTasksUseCase } from "@application/use-cases/list-tasks/IListTasksUseCase";
import { ITaskRepository } from "@domain/repositories/ITaskRepository";
import { Task } from "@domain/entities/Task";
import { inject, injectable } from "inversify";
import TYPES from "@core/types";

@injectable()
export class ListTasksUseCase implements IListTasksUseCase {
  constructor(
    @inject(TYPES.ITaskRepository)
    private taskRepository: ITaskRepository
  ) {}

  async execute(): Promise<Task[]> {
    return await this.taskRepository.findAll();
  }
}
