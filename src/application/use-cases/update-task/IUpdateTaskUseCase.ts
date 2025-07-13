import { UpdateTaskDTO } from "@application/use-cases/update-task/UpdateTaskDTO";

export interface IUpdateTaskUseCase {
  execute(id: string, data: UpdateTaskDTO): Promise<void>;
}
