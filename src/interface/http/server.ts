import dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import express from "express";
import taskRoutes from "@interface/http/routes/task-routes";
import { connectMongoose } from "@infra/db/mongodb/mongoClient";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", taskRoutes);

async function start() {
  try {
    await connectMongoose();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("[Server] Failed to connect to MongoDB", error);
    process.exit(1);
  }
}

start();
