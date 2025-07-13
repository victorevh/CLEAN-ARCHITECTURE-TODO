import { InMemoryTaskRepository } from "@infra/repositories/InMemoryTaskRepository";
import { Task } from "@domain/entities/Task";
import { HttpError } from "@interface/http/errors/HttpError";

describe("InMemoryTaskRepository", () => {
  let repo: InMemoryTaskRepository;
  let sampleTask: Task;

  beforeEach(() => {
    repo = new InMemoryTaskRepository();
    sampleTask = new Task({
      id: "123",
      title: "Test task",
      description: "Description",
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  it("should create and return a task", async () => {
    const created = await repo.create(sampleTask);
    expect(created).toEqual(sampleTask);
    const allTasks = await repo.findAll();
    expect(allTasks).toContainEqual(sampleTask);
  });

  it("should find a task by id", async () => {
    await repo.create(sampleTask);
    const found = await repo.findById("123");
    expect(found).toEqual(sampleTask);
  });

  it("should return null if task not found by id", async () => {
    const found = await repo.findById("non-existent-id");
    expect(found).toBeNull();
  });

  it("should update an existing task", async () => {
    await repo.create(sampleTask);
    const updatedTask = new Task({
      ...sampleTask,
      title: "Updated title",
    });
    const updated = await repo.update(updatedTask);
    expect(updated.title).toBe("Updated title");

    const found = await repo.findById("123");
    expect(found?.title).toBe("Updated title");
  });

  it("should throw HttpError.notFound when updating non-existing task", async () => {
    const nonExistentTask = new Task({
      id: "not-found",
      title: "No task",
      description: "",
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await expect(repo.update(nonExistentTask)).rejects.toThrow(HttpError);
  });

  it("should delete a task by id", async () => {
    await repo.create(sampleTask);
    await repo.delete("123");
    const found = await repo.findById("123");
    expect(found).toBeNull();
  });

  it("should do nothing if deleting a non-existing task", async () => {
    await repo.create(sampleTask);
    await repo.delete("non-existent-id");
    const allTasks = await repo.findAll();
    expect(allTasks.length).toBe(1);
    expect(allTasks[0]).toEqual(sampleTask);
  });
});
