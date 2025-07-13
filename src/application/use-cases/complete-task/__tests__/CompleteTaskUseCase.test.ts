import { CompleteTaskUseCase } from "@application/use-cases/complete-task/CompleteTaskUseCase";
import { InMemoryTaskRepository } from "@infra/db/in-memory/repositories/InMemoryTaskRepository";
import { Task } from "@domain/entities/Task";
import { HttpError } from "@interface/http/errors/HttpError";

describe("CompleteTaskUseCase", () => {
  let useCase: CompleteTaskUseCase;
  let repo: InMemoryTaskRepository;
  let existingTask: Task;

  beforeEach(async () => {
    repo = new InMemoryTaskRepository();
    useCase = new CompleteTaskUseCase(repo);

    existingTask = new Task({
      id: "task-1",
      title: "Incomplete task",
      description: "This task is not completed yet",
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await repo.create(existingTask);
  });

  it("should mark the task as completed", async () => {
    await useCase.execute(existingTask.id);

    const updatedTask = await repo.findById(existingTask.id);
    expect(updatedTask).not.toBeNull();
    expect(updatedTask?.completed).toBe(true);
  });

  it("should throw not found error if task does not exist", async () => {
    await expect(useCase.execute("non-existent-id")).rejects.toThrow(HttpError);
    await expect(useCase.execute("non-existent-id")).rejects.toThrow(
      "Task not found"
    );
  });
});
