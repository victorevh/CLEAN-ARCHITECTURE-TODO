import { Task } from "../Task";

describe("Task Entity", () => {
  const validProps = {
    id: "123",
    title: "Test Task",
    description: "Some description",
  };

  it("should create a task with default completed as false", () => {
    const task = new Task(validProps);
    expect(task.id).toBe(validProps.id);
    expect(task.title).toBe(validProps.title);
    expect(task.description).toBe(validProps.description);
    expect(task.completed).toBe(false);
    expect(task.createdAt).toBeInstanceOf(Date);
    expect(task.updatedAt).toBeInstanceOf(Date);
  });

  it("should throw error if title is empty", () => {
    expect(() => {
      new Task({ ...validProps, title: "" });
    }).toThrow("Task Title must not be empty");
  });

  it("should mark task as completed", () => {
    const task = new Task(validProps);
    task.markAsCompleted();
    expect(task.completed).toBe(true);
    expect(task.updatedAt.getTime()).toBeGreaterThanOrEqual(
      task.createdAt.getTime()
    );
  });

  it("should not update updatedAt or completed if task already completed", () => {
    const task = new Task({ ...validProps, completed: true });
    const oldUpdatedAt = task.updatedAt;

    task.markAsCompleted();

    expect(task.completed).toBe(true);
    expect(task.updatedAt).toBe(oldUpdatedAt);
  });

  it("should update details correctly", () => {
    const task = new Task(validProps);
    const newTitle = "Updated Task";
    const newDescription = "Updated description";

    task.updateDetails(newTitle, newDescription);

    expect(task.title).toBe(newTitle);
    expect(task.description).toBe(newDescription);
    expect(task.updatedAt.getTime()).toBeGreaterThanOrEqual(
      task.createdAt.getTime()
    );
  });

  it("should throw error when updating with empty title", () => {
    const task = new Task(validProps);
    expect(() => task.updateDetails("")).toThrow(
      "Task Title must not be empty"
    );
  });
});
