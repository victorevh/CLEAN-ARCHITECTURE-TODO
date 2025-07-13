import { randomUUID } from "crypto";
import { Task } from "../../../domain/entities/Task";
import { ITaskRepository } from "../../../domain/repositories/ITaskRepository";
import { ICreateTaskUseCase } from "./ICreateTaskUseCase";

export class CreateTaskUseCase implements ICreateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(props: { title: string; description?: string }): Promise<Task> {
    const task = new Task({
      id: randomUUID(),
      title: props.title,
      description: props.description,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.taskRepository.create(task);
    return task;
  }
}
