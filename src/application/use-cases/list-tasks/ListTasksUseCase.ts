import { Task } from "@domain/entities/Task";
import { inject, injectable } from "inversify";
import type { IListTasksUseCase } from "@application/use-cases/list-tasks/IListTasksUseCase";
import type { ITaskRepository } from "@domain/repositories/ITaskRepository";
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
