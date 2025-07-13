import { MongoTaskRepository } from "../MongoTaskRepository";
import { Task } from "@domain/entities/Task";
import { randomUUID } from "crypto";

describe("MongoTaskRepository", () => {
  let repository: MongoTaskRepository;

  beforeEach(() => {
    repository = new MongoTaskRepository();
  });

  it("should create and retrieve a task", async () => {
    const task = new Task({
      id: randomUUID(),
      title: "Test Task",
      description: "Description",
    });

    await repository.create(task);

    const found = await repository.findById(task.id);
    expect(found).not.toBeNull();
    expect(found?.title).toBe("Test Task");
  });
});
