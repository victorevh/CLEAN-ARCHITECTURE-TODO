import { injectable } from "inversify";
import { HttpError } from "@interface/http/errors/HttpError";
import type { Task } from "@domain/entities/Task";
import type { ITaskRepository } from "@domain/repositories/ITaskRepository";

@injectable()
export class InMemoryTaskRepository implements ITaskRepository {
  private tasks: Task[] = [];

  async create(task: Task): Promise<Task> {
    this.tasks.push(task);
    return task;
  }

  async findAll(): Promise<Task[]> {
    return this.tasks;
  }

  async findById(id: string): Promise<Task | null> {
    const task = this.tasks.find((t) => t.id === id);
    return task || null;
  }

  async update(task: Task): Promise<Task> {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index === -1) throw HttpError.notFound("Task not found");
    this.tasks[index] = task;
    return task;
  }

  async delete(id: string): Promise<void> {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }
}
