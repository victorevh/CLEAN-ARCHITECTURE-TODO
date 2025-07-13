import "reflect-metadata";
import express from "express";
import taskRoutes from "./routes/task-routes";

const app = express();

app.use(express.json());
app.use("/api", taskRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
