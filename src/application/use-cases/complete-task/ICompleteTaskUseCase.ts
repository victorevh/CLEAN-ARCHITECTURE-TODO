export interface ICompleteTaskUseCase {
  execute(id: string): Promise<void>;
}
