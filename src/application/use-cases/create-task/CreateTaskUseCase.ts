import { randomUUID } from "crypto";
import { Task } from "@domain/entities/Task";
import { CreateTaskDTO } from "@application/use-cases/create-task/CreateTaskDTO";
import { inject, injectable } from "inversify";
import type { ITaskRepository } from "@domain/repositories/ITaskRepository";
import type { ICreateTaskUseCase } from "@application/use-cases/create-task/ICreateTaskUseCase";
import TYPES from "@core/types";

@injectable()
export class CreateTaskUseCase implements ICreateTaskUseCase {
  constructor(
    @inject(TYPES.ITaskRepository) private taskRepository: ITaskRepository
  ) {}
  async execute(data: CreateTaskDTO): Promise<Task> {
    const task = new Task({
      id: randomUUID(),
      title: data.title,
      description: data.description,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.taskRepository.create(task);
    return task;
  }
}
