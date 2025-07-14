import { UpdateTaskUseCase } from "@application/use-cases/update-task/UpdateTaskUseCase";
import { InMemoryTaskRepository } from "@infra/db/in-memory/repositories/InMemoryTaskRepository";
import { UpdateTaskDTO } from "@application/use-cases/update-task/UpdateTaskDTO";
import { Task } from "@domain/entities/Task";
import { HttpError } from "@interface/http/errors/HttpError";

describe("UpdateTaskUseCase", () => {
  let useCase: UpdateTaskUseCase;
  let repo: InMemoryTaskRepository;
  let existingTask: Task;

  beforeEach(async () => {
    repo = new InMemoryTaskRepository();
    useCase = new UpdateTaskUseCase(repo);

    existingTask = new Task({
      id: "task-1",
      title: "Initial title",
      description: "Initial description",
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await repo.create(existingTask);
  });

  it("should update title and completed fields of an existing task", async () => {
    const updateData: UpdateTaskDTO = {
      title: "Updated title",
      completed: true,
    };

    await useCase.execute(existingTask.id, updateData);

    const updatedTask = await repo.findById(existingTask.id);

    expect(updatedTask).not.toBeNull();
    expect(updatedTask?.title).toBe("Updated title");
    expect(updatedTask?.completed).toBe(true);
    expect(updatedTask?.description).toBe(existingTask.description);
  });

  it("should throw not found error if task does not exist", async () => {
    const updateData: UpdateTaskDTO = {
      title: "New title",
    };

    await expect(
      useCase.execute("non-existent-id", updateData)
    ).rejects.toThrow(HttpError);
    await expect(
      useCase.execute("non-existent-id", updateData)
    ).rejects.toThrow("Task not found");
  });

  it("should throw bad request error if no fields provided", async () => {
    const updateData: UpdateTaskDTO = {};

    await expect(useCase.execute(existingTask.id, updateData)).rejects.toThrow(
      HttpError
    );
    await expect(useCase.execute(existingTask.id, updateData)).rejects.toThrow(
      "At least one field must be provided to update."
    );
  });

  it("should update description field of an existing task", async () => {
    const updateData: UpdateTaskDTO = {
      description: "Updated description",
    };

    await useCase.execute(existingTask.id, updateData);

    const updatedTask = await repo.findById(existingTask.id);

    expect(updatedTask).not.toBeNull();
    expect(updatedTask?.description).toBe("Updated description");
  });
});
