import dotenvFlow from "dotenv-flow";
process.env.NODE_ENV = process.env.NODE_ENV || "development";
dotenvFlow.config();

import "reflect-metadata";
import express from "express";
import taskRoutes from "@interface/http/routes/task-routes";
import { connectMongoose } from "@infra/db/mongodb/mongoClient";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";

const app = express();
const PORT = process.env.PORT || 3000;
const DRIVER = process.env.REPOSITORY_DRIVER;

app.use(express.json());
app.use("/api", taskRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

async function start() {
  try {
    if (DRIVER === "mongo") {
      await connectMongoose();
      console.log("[Database] Connected to MongoDB");
    }

    if (DRIVER === "inmemory") {
      console.log("[Database] Using InMemory Repository");
    }

    app.listen(PORT, () => {
      console.log(`[Server] Running on port ${PORT} using "${DRIVER}" driver`);
      console.log(
        `[Swagger] API docs available at http://localhost:${PORT}/api-docs`
      );
    });
  } catch (error) {
    console.error("[Startup] Failed to initialize server:", error);
    process.exit(1);
  }
}

start();
