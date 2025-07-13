import { Router } from "express";
import { adaptRoute } from "@interface/http/adapters/express-adapter";
import { CreateTaskController } from "@interface/http/controllers/CreateTaskController";
import { ListTasksController } from "@interface/http/controllers/ListTasksController";
import { UpdateTaskController } from "@interface/http/controllers/UpdateTaskController";
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

router.post("/tasks", adaptRoute(createTaskController));
router.get("/tasks", adaptRoute(listTasksController));
router.patch("/tasks/:id", adaptRoute(updateTaskController));

export default router;
