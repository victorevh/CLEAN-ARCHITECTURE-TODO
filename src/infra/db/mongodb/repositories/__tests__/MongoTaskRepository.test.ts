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

  it("should return all tasks", async () => {
    const task1 = new Task({
      id: randomUUID(),
      title: "Task 1",
      description: "",
    });
    const task2 = new Task({
      id: randomUUID(),
      title: "Task 2",
      description: "",
    });

    await repository.create(task1);
    await repository.create(task2);

    const tasks = await repository.findAll();
    expect(tasks.length).toBeGreaterThanOrEqual(2);
  });

  it("should update a task", async () => {
    const task = new Task({ id: randomUUID(), title: "Old", description: "" });
    await repository.create(task);

    task.title = "New Title";
    const updated = await repository.update(task);

    expect(updated.title).toBe("New Title");
  });

  it("should throw if task does not exist on update", async () => {
    const nonExistentTask = new Task({
      id: randomUUID(),
      title: "X",
      description: "",
    });

    await expect(repository.update(nonExistentTask)).rejects.toThrow(
      "Task not found"
    );
  });

  it("should delete a task", async () => {
    const task = new Task({
      id: randomUUID(),
      title: "To Delete",
      description: "",
    });
    await repository.create(task);

    await repository.delete(task.id);
    const found = await repository.findById(task.id);

    expect(found).toBeNull();
  });
});
