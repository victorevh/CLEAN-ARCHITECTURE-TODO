import { Router } from "express";
import { adaptRoute } from "@interface/http/adapters/express-adapter";
import { CreateTaskController } from "@interface/http/controllers/CreateTaskController";
import container from "@core/container";
import TYPES from "@core/types";

const router = Router();

const createTaskController = container.get<CreateTaskController>(
  TYPES.CreateTaskController
);

router.post("/tasks", adaptRoute(createTaskController));

export default router;
