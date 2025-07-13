import { Task } from "../../../domain/entities/Task";
import { CreateTaskDTO } from "./CreateTaskDTO";

export interface ICreateTaskUseCase {
  execute(data: CreateTaskDTO): Promise<Task>;
}
