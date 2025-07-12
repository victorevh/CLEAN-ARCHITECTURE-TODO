import { Task } from "../../../domain/entities/Task";

export interface ICreateTaskUseCase {
  execute(props: { title: string; description?: string }): Promise<Task>;
}
