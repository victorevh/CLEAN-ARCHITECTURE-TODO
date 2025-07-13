import { Task } from "@domain/entities/Task";

export interface IGetTaskByIdUseCase {
  execute(id: string): Promise<Task | null>;
}
