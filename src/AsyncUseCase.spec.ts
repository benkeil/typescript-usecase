import { AsyncUseCase } from './AsyncUseCase';

class VoidVoidUseCase implements AsyncUseCase<void, void> {
  async execute(): Promise<void> {}
}

class VoidNumberUseCase implements AsyncUseCase<void, number> {
  execute<R>(outputPort: (result: number) => Promise<R>): Promise<R> {
    return outputPort(1);
  }
}

class NumberVoidUseCase implements AsyncUseCase<number, void> {
  async execute(inputPort: () => number): Promise<void> {}
}

class NumberNumberUseCase implements AsyncUseCase<number, number> {
  async execute<R>(inputPort: () => number, outputPort: (result: number) => Promise<R>): Promise<R> {
    const value = await new Promise<number>((resolve) => setTimeout(() => resolve(inputPort()), 100));
    return outputPort(value);
  }
}

describe('AsyncUseCase', () => {
  test('VoidVoidUseCase', async () => {
    const useCase = new VoidVoidUseCase();
    const view = await useCase.execute();
    expect(view).toBe(undefined);
  });

  test('VoidNumberUseCase', async () => {
    const useCase = new VoidNumberUseCase();
    const view = await useCase.execute(async (result) => result);
    expect(view).toBe(1);
  });

  test('NumberVoidUseCase', async () => {
    const useCase = new NumberVoidUseCase();
    const view = await useCase.execute(() => 1);
    expect(view).toBe(undefined);
  });

  test('NumberNumberUseCase', async () => {
    const useCase = new NumberNumberUseCase();
    const result = await useCase.execute(
      () => 1,
      async (result) => result,
    );
    expect(result).toBe(1);
  });
});
