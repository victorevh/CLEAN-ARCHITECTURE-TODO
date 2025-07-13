import { Router } from "express";
import { adaptRoute } from "@interface/http/adapters/express-adapter";
import { CreateTaskController } from "@interface/http/controllers/CreateTaskController";
import container from "@core/container";

const router = Router();

const createTaskController = container.get(CreateTaskController);
router.post("/tasks", adaptRoute(createTaskController));

export default router;
