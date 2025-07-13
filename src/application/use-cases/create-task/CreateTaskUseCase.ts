import { randomUUID } from "crypto";
import { Task } from "@domain/entities/Task";
import { ITaskRepository } from "@domain/repositories/ITaskRepository";
import { ICreateTaskUseCase } from "@application/use-cases/create-task/ICreateTaskUseCase";
import { CreateTaskDTO } from "@application/use-cases/create-task/CreateTaskDTO";

export class CreateTaskUseCase implements ICreateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

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
