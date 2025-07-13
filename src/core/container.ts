import { Container } from "inversify";
import TYPES from "./types";
import type { ITaskRepository } from "@domain/repositories/ITaskRepository";
import { InMemoryTaskRepository } from "@infra/repositories/InMemoryTaskRepository";
import { CreateTaskUseCase } from "@application/use-cases/create-task/CreateTaskUseCase";
import { ListTasksUseCase } from "@application/use-cases/list-tasks/ListTasksUseCase";
import { GetTaskByIdUseCase } from "@application/use-cases/get-task-by-id/GetTaskByIdUseCase";
import { UpdateTaskUseCase } from "@application/use-cases/update-task/UpdateTaskUseCase";
import { DeleteTaskUseCase } from "@application/use-cases/delete-task/DeleteTaskUseCase";
import { CompleteTaskUseCase } from "@application/use-cases/complete-task/CompleteTaskUseCase";
import { CreateTaskController } from "@interface/http/controllers/CreateTaskController";

const container = new Container();

// Repository bindings
container
  .bind<ITaskRepository>(TYPES.ITaskRepository)
  .to(InMemoryTaskRepository)
  .inSingletonScope();
// Use case bindings
container
  .bind<CreateTaskUseCase>(TYPES.CreateTaskUseCase)
  .to(CreateTaskUseCase);
container.bind<ListTasksUseCase>(TYPES.ListTasksUseCase).to(ListTasksUseCase);
container
  .bind<GetTaskByIdUseCase>(TYPES.GetTaskByIdUseCase)
  .to(GetTaskByIdUseCase);
container
  .bind<UpdateTaskUseCase>(TYPES.UpdateTaskUseCase)
  .to(UpdateTaskUseCase);
container
  .bind<DeleteTaskUseCase>(TYPES.DeleteTaskUseCase)
  .to(DeleteTaskUseCase);
container
  .bind<CompleteTaskUseCase>(TYPES.CompleteTaskUseCase)
  .to(CompleteTaskUseCase);
// Controller bindings
container
  .bind<CreateTaskController>(TYPES.CreateTaskController)
  .to(CreateTaskController);

export default container;
