import { Task } from "../entities/Task";

export interface ITaskRepository {
  create(task: Task): Promise<Task>;
  findAll(): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  update(task: Task): Promise<Task>;
  delete(id: string): Promise<void>;
}
