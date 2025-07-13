const TYPES = {
  ITaskRepository: Symbol.for("ITaskRepository"),
  CreateTaskUseCase: Symbol.for("CreateTaskUseCase"),
  ListTasksUseCase: Symbol.for("ListTasksUseCase"),
  UpdateTaskUseCase: Symbol.for("UpdateTaskUseCase"),
  DeleteTaskUseCase: Symbol.for("DeleteTaskUseCase"),
  CompleteTaskUseCase: Symbol.for("CompleteTaskUseCase"),
  GetTaskByIdUseCase: Symbol.for("GetTaskByIdUseCase"),
  CreateTaskController: Symbol.for("CreateTaskController"),
};

export default TYPES;
