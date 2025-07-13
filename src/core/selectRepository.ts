import { MongoTaskRepository } from "@infra/db/mongodb/repositories/MongoTaskRepository";
import { InMemoryTaskRepository } from "@infra/db/in-memory/repositories/InMemoryTaskRepository";
import type { ITaskRepository } from "@domain/repositories/ITaskRepository";

type RepositoryConstructor = new (...args: unknown[]) => ITaskRepository;

export function selectRepository(): RepositoryConstructor {
  const strategies: Record<string, RepositoryConstructor> = {
    mongo: MongoTaskRepository,
    inmemory: InMemoryTaskRepository,
  };

  const driver = process.env.REPOSITORY_DRIVER || "inmemory";
  const Repository = strategies[driver];

  if (!Repository) {
    throw new Error(`[Container] Unsupported REPOSITORY_DRIVER: ${driver}`);
  }

  return Repository;
}
