import { UpdateTaskDTO } from "./UpdateTaskDTO";

export interface IUpdateTaskUseCase {
  execute(id: string, data: UpdateTaskDTO): Promise<void>;
}
