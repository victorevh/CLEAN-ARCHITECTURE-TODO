const TYPES = {
  // Repositories
  ITaskRepository: Symbol.for("ITaskRepository"),
  // Use Cases
  CreateTaskUseCase: Symbol.for("CreateTaskUseCase"),
  ListTasksUseCase: Symbol.for("ListTasksUseCase"),
  UpdateTaskUseCase: Symbol.for("UpdateTaskUseCase"),
  DeleteTaskUseCase: Symbol.for("DeleteTaskUseCase"),
  CompleteTaskUseCase: Symbol.for("CompleteTaskUseCase"),
  GetTaskByIdUseCase: Symbol.for("GetTaskByIdUseCase"),
  // Controllers
  CreateTaskController: Symbol.for("CreateTaskController"),
  ListTasksController: Symbol.for("ListTasksController"),
  UpdateTaskController: Symbol.for("UpdateTaskController"),
  GetTaskByIdController: Symbol.for("GetTaskByIdController"),
  CompleteTaskController: Symbol.for("CompleteTaskController"),
};

export default TYPES;
