import { AsyncOutputPortFunction, AsyncUseCase } from '../src/AsyncUseCase';

class NumberToStringUseCase implements AsyncUseCase<number, string> {
  execute<R>(inputPort: () => number, outputPort: (result: Promise<string>) => Promise<R>): Promise<R> {
    return outputPort(Promise.resolve(String(inputPort())));
  }
}

describe('AsyncUseCase', () => {
  test('execute', () => {
    (async () => {
      const numberToStringUseCase = new NumberToStringUseCase();
      const controller = () => 123;
      const stringLengthPresenter: AsyncOutputPortFunction<string, number> = async (result) => {
        return (await result).length;
      };
      const output = await numberToStringUseCase.execute(controller, stringLengthPresenter);
      expect(output).toBe(3);
    })();
  });
});
