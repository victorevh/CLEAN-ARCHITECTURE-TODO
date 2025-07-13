import { InMemoryTaskRepository } from "@infra/repositories/InMemoryTaskRepository";
import { CreateTaskUseCase } from "@application/use-cases/create-task/CreateTaskUseCase";
import { CreateTaskDTO } from "@application/use-cases/create-task/CreateTaskDTO";

describe("CreateTaskUseCase", () => {
  let useCase: CreateTaskUseCase;

  beforeEach(() => {
    const repo = new InMemoryTaskRepository();
    useCase = new CreateTaskUseCase(repo);
  });

  it("should create a task with title and description", async () => {
    const input: CreateTaskDTO = {
      title: "Wash the car",
      description: "It's very dirty",
    };

    const task = await useCase.execute(input);

    expect(task).toHaveProperty("id");
    expect(task.title).toBe("Wash the car");
    expect(task.description).toBe("It's very dirty");
    expect(task.completed).toBe(false);
    expect(task.createdAt).toBeInstanceOf(Date);
    expect(task.updatedAt).toBeInstanceOf(Date);
  });

  it("should create a task with an empty description", async () => {
    const input: CreateTaskDTO = {
      title: "Buy bread",
      description: "",
    };

    const task = await useCase.execute(input);

    expect(task.title).toBe("Buy bread");
    expect(task.description).toBe("");
  });

  it("should throw an error if title is missing", async () => {
    const input: CreateTaskDTO = {
      title: "",
      description: "No title provided",
    };

    await expect(useCase.execute(input)).rejects.toThrow();
  });

  it("should throw an error if title is an empty string", async () => {
    const input: CreateTaskDTO = {
      title: "",
      description: "Some description",
    };

    await expect(useCase.execute(input)).rejects.toThrow();
  });
});
