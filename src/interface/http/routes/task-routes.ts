import { Router } from "express";
import container from "@core/container";
import TYPES from "@core/types";
import { adaptRoute } from "@interface/http/adapters/express-adapter";
import { CreateTaskController } from "@interface/http/controllers/CreateTaskController";
import { ListTasksController } from "@interface/http/controllers/ListTasksController";

const router = Router();

const createTaskController = container.get<CreateTaskController>(
  TYPES.CreateTaskController
);
const listTasksController = container.get<ListTasksController>(
  TYPES.ListTasksUseCase
);

router.post("/tasks", adaptRoute(createTaskController));
router.get("/tasks", adaptRoute(listTasksController));

export default router;
