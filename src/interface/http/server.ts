import dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import express from "express";
import taskRoutes from "@interface/http/routes/task-routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", taskRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
