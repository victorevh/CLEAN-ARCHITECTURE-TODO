import { Task } from "@domain/entities/Task";
import { CreateTaskDTO } from "@application/use-cases/create-task/CreateTaskDTO";

export interface ICreateTaskUseCase {
  execute(data: CreateTaskDTO): Promise<Task>;
}
