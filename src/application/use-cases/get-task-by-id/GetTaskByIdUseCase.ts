import { Task } from "@domain/entities/Task";
import { inject, injectable } from "inversify";
import type { ITaskRepository } from "@domain/repositories/ITaskRepository";
import type { IGetTaskByIdUseCase } from "@application/use-cases/get-task-by-id/IGetTaskByIdUseCase";
import TYPES from "@core/types";

@injectable()
export class GetTaskByIdUseCase implements IGetTaskByIdUseCase {
  constructor(
    @inject(TYPES.ITaskRepository)
    private taskRepository: ITaskRepository
  ) {}

  async execute(id: string): Promise<Task | null> {
    return this.taskRepository.findById(id);
  }
}
