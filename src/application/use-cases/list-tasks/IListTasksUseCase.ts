import { Task } from "@domain/entities/Task";

export interface IListTasksUseCase {
  execute(): Promise<Task[]>;
}
