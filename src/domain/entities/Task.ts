export class Task {
  public readonly id: string;
  public title: string;
  public description?: string;
  public completed: boolean;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(props: {
    id: string;
    title: string;
    description?: string;
    completed?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    if (!props.title || props.title.trim().length === 0) {
      throw new Error("Task Title must not be empty");
    }

    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.completed = props.completed ?? false;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  public markAsCompleted() {
    if (this.completed) return;
    this.completed = true;
    this.updatedAt = new Date();
  }

  public updateDetails(title: string, description?: string) {
    if (!title || title.trim().length === 0) {
      throw new Error("Task Title must not be empty");
    }
    this.title = title;
    this.description = description;
    this.updatedAt = new Date();
  }
}
