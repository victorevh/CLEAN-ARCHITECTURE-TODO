import { ListTasksUseCase } from "@application/use-cases/list-tasks/ListTasksUseCase";
import { InMemoryTaskRepository } from "@infra/db/in-memory/repositories/InMemoryTaskRepository";
import { Task } from "@domain/entities/Task";

describe("ListTasksUseCase", () => {
  let listTasksUseCase: ListTasksUseCase;
  let taskRepository: InMemoryTaskRepository;

  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository();
    listTasksUseCase = new ListTasksUseCase(taskRepository);
  });

  it("should return an empty array if no tasks exist", async () => {
    const tasks = await listTasksUseCase.execute();
    expect(tasks).toEqual([]);
  });

  it("should return all tasks from the repository", async () => {
    const task1 = new Task({
      id: "1",
      title: "Task 1",
      description: "First task",
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const task2 = new Task({
      id: "2",
      title: "Task 2",
      description: "Second task",
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await taskRepository.create(task1);
    await taskRepository.create(task2);

    const tasks = await listTasksUseCase.execute();

    expect(tasks).toHaveLength(2);
    expect(tasks).toEqual(expect.arrayContaining([task1, task2]));
  });
});
