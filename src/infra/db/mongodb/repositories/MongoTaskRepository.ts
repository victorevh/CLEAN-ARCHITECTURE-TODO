import { TaskModel } from "@infra/db/mongodb/schemas/TaskSchema";
import { HttpError } from "@interface/http/errors/HttpError";
import { Task } from "@domain/entities/Task";
import type { ITask } from "@infra/db/mongodb/schemas/TaskSchema";
import type { ITaskRepository } from "@domain/repositories/ITaskRepository";

export class MongoTaskRepository implements ITaskRepository {
  private mapToEntity(mongooseDoc: ITask): Task {
    return new Task({
      id: mongooseDoc.id,
      title: mongooseDoc.title,
      description: mongooseDoc.description,
      completed: mongooseDoc.completed,
      createdAt: mongooseDoc.createdAt,
      updatedAt: mongooseDoc.updatedAt,
    });
  }

  async create(task: Task): Promise<Task> {
    const created = await TaskModel.create(task);
    return this.mapToEntity(created);
  }

  async findAll(): Promise<Task[]> {
    const tasks = await TaskModel.find().exec();
    return tasks.map(this.mapToEntity);
  }

  async findById(id: string): Promise<Task | null> {
    const task = await TaskModel.findOne({ id }).exec();
    if (!task) return null;
    return this.mapToEntity(task);
  }

  async update(task: Task): Promise<Task> {
    const updated = await TaskModel.findOneAndUpdate({ id: task.id }, task, {
      new: true,
    }).exec();

    if (!updated) {
      throw HttpError.notFound("Task not found");
    }

    return this.mapToEntity(updated);
  }

  async delete(id: string): Promise<void> {
    await TaskModel.deleteOne({ id }).exec();
  }
}
