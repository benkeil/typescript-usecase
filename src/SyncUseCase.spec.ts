import { SyncUseCase } from './SyncUseCase';

class VoidVoidUseCase implements SyncUseCase<void, void> {
  execute(): void {}
}

class VoidNumberUseCase implements SyncUseCase<void, number> {
  execute<R>(outputPort: (result: number) => R): R {
    return outputPort(1);
  }
}

class NumberVoidUseCase implements SyncUseCase<number, void> {
  execute(inputPort: () => number): void {}
}

class NumberNumberUseCase implements SyncUseCase<number, number> {
  execute<R>(inputPort: () => number, outputPort: (result: number) => R): R {
    return outputPort(inputPort());
  }
}

describe('SyncUseCase', () => {
  test('VoidVoidUseCase', () => {
    const useCase = new VoidVoidUseCase();
    useCase.execute();
  });

  test('VoidNumberUseCase', () => {
    const useCase = new VoidNumberUseCase();
    const view = useCase.execute((result) => result);
    expect(view).toBe(1);
  });

  test('NumberVoidUseCase', () => {
    const useCase = new NumberVoidUseCase();
    useCase.execute(() => 1);
  });

  test('NumberNumberUseCase', () => {
    const useCase = new NumberNumberUseCase();
    const result = useCase.execute(
      () => 1,
      (result) => result,
    );
    expect(result).toBe(1);
  });
});
