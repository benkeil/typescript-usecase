import UseCase from '../src/UseCase';

class SimpleUseCase implements UseCase<number, string> {
  execute<R>(inputPort: () => number, outputPort: (result: string) => R): R {
    return outputPort(String(inputPort()));
  }
}

describe('UseCase', () => {
  test('execute', () => {
    const simpleUseCase = new SimpleUseCase();
    expect(
      simpleUseCase.execute(
        () => 123,
        (result) => result.length,
      ),
    ).toBe(3);
  });
});
