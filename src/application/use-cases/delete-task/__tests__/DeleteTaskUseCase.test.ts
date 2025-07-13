import { DeleteTaskUseCase } from "@application/use-cases/delete-task/DeleteTaskUseCase";
import { InMemoryTaskRepository } from "@infra/repositories/InMemoryTaskRepository";
import { Task } from "@domain/entities/Task";
import { HttpError } from "@interface/http/errors/HttpError";

describe("DeleteTaskUseCase", () => {
  let useCase: DeleteTaskUseCase;
  let repo: InMemoryTaskRepository;
  let existingTask: Task;

  beforeEach(async () => {
    repo = new InMemoryTaskRepository();
    useCase = new DeleteTaskUseCase(repo);

    existingTask = new Task({
      id: "task-1",
      title: "Task to delete",
      description: "This task will be deleted",
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await repo.create(existingTask);
  });

  it("should delete the task when given a valid id", async () => {
    await useCase.execute(existingTask.id);

    const taskAfterDelete = await repo.findById(existingTask.id);
    expect(taskAfterDelete).toBeNull();
  });

  it("should throw not found error if task does not exist", async () => {
    await expect(useCase.execute("non-existent-id")).rejects.toThrow(HttpError);
    await expect(useCase.execute("non-existent-id")).rejects.toThrow(
      "Task not found"
    );
  });
});
