import { Router } from "express";
import { adaptRoute } from "@interface/http/adapters/express-adapter";
import { CreateTaskController } from "@interface/http/controllers/CreateTaskController";
import { ListTasksController } from "@interface/http/controllers/ListTasksController";
import { UpdateTaskController } from "@interface/http/controllers/UpdateTaskController";
import { GetTaskByIdController } from "@interface/http/controllers/GetTaskByIdController";
import { CompleteTaskController } from "@interface/http/controllers/CompleteTaskController";
import { DeleteTaskController } from "@interface/http/controllers/DeleteTaskController";
import container from "@core/container";
import TYPES from "@core/types";

const router = Router();

const createTaskController = container.get<CreateTaskController>(
  TYPES.CreateTaskController
);
const listTasksController = container.get<ListTasksController>(
  TYPES.ListTasksController
);
const updateTaskController = container.get<UpdateTaskController>(
  TYPES.UpdateTaskController
);
const getTaskByIdController = container.get<GetTaskByIdController>(
  TYPES.GetTaskByIdController
);
const completeTaskController = container.get<CompleteTaskController>(
  TYPES.CompleteTaskController
);
const deleteTaskController = container.get<DeleteTaskController>(
  TYPES.DeleteTaskController
);

router.post("/tasks", adaptRoute(createTaskController));
router.get("/tasks", adaptRoute(listTasksController));
router.patch("/tasks/:id", adaptRoute(updateTaskController));
router.get("/tasks/:id", adaptRoute(getTaskByIdController));
router.patch("/tasks/:id/complete", adaptRoute(completeTaskController));
router.delete("/tasks/:id", adaptRoute(deleteTaskController));

export default router;
