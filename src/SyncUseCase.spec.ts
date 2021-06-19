import { SyncOutputPortFunction, SyncUseCase } from './SyncUseCase';

class NumberToStringUseCase implements SyncUseCase<number, string> {
  execute<R>(inputPort: () => number, outputPort: (result: string) => R): R {
    return outputPort(String(inputPort()));
  }
}

describe('SyncUseCase', () => {
  test('execute', () => {
    const numberToStringUseCase = new NumberToStringUseCase();
    const controller = () => 123;
    const stringLengthPresenter: SyncOutputPortFunction<string, number> = (result) => result.length;
    expect(numberToStringUseCase.execute(controller, stringLengthPresenter)).toBe(3);
  });
});
