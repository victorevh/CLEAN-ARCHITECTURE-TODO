import { GetTaskByIdUseCase } from "@application/use-cases/get-task-by-id/GetTaskByIdUseCase";
import { InMemoryTaskRepository } from "@infra/repositories/InMemoryTaskRepository";
import { Task } from "@domain/entities/Task";

describe("GetTaskByIdUseCase", () => {
  let useCase: GetTaskByIdUseCase;
  let repo: InMemoryTaskRepository;
  let existingTask: Task;

  beforeEach(async () => {
    repo = new InMemoryTaskRepository();
    useCase = new GetTaskByIdUseCase(repo);

    existingTask = new Task({
      id: "task-1",
      title: "Sample task",
      description: "Sample description",
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await repo.create(existingTask);
  });

  it("should return the task when given a valid id", async () => {
    const task = await useCase.execute(existingTask.id);

    expect(task).not.toBeNull();
    expect(task?.id).toBe(existingTask.id);
    expect(task?.title).toBe(existingTask.title);
  });

  it("should return null when task with given id does not exist", async () => {
    const task = await useCase.execute("non-existent-id");
    expect(task).toBeNull();
  });
});
