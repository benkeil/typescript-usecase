import Result from '@benkeil/typescript-result/dist/Result';
import AsyncUseCase from './AsyncUseCase';
import AsyncOutputPortFunction from './AsyncOutputPortFunction';
import AsyncOutputPort from './AsyncOutputPort';

class NumberToStringUseCase implements AsyncUseCase<number, string> {
  async execute<R>(inputPort: () => number, outputPort: (result: string) => Promise<R> | R): Promise<R> {
    return outputPort(String(inputPort()));
  }
}

class Service {
  async isEven(value: number): Promise<boolean> {
    return value % 2 === 0;
  }
}

class IsEvenNumberUseCase implements AsyncUseCase<number, Boolean> {
  constructor(private service: Service) {}

  async execute<R>(inputPort: () => number, outputPort: AsyncOutputPortFunction<Boolean, R>): Promise<R> {
    return outputPort(await this.service.isEven(inputPort()));
  }
}

class StringPresenter implements AsyncOutputPort<Boolean, string> {
  present(result: Boolean): Promise<string> | string {
    return result ? 'JA' : 'NEIN';
  }
}

class ResultUseCase implements AsyncUseCase<number, Result<Promise<Boolean>>> {
  async execute<R>(
    inputPort: () => number,
    outputPort: AsyncOutputPortFunction<Result<Promise<Boolean>>, R>,
  ): Promise<R> {
    return outputPort(Result.from(async () => inputPort() % 2 === 0));
  }
}

describe('AsyncUseCase', () => {
  test('execute', () => {
    (async () => {
      const numberToStringUseCase = new NumberToStringUseCase();
      const controller = () => 123;
      const stringLengthPresenter: AsyncOutputPortFunction<string, number> = (result) => {
        return result.length;
      };
      const output = await numberToStringUseCase.execute(controller, stringLengthPresenter);
      expect(output).toBe(3);
    })();
  });

  test('AsyncOutputPortFunction', () => {
    (async () => {
      const service = new Service();
      const isEvenNumberUseCase = new IsEvenNumberUseCase(service);
      const controller = () => 123;
      const stringPresenter: AsyncOutputPortFunction<Boolean, string> = (result) => {
        return result ? 'JA' : 'NEIN';
      };
      const output = await isEvenNumberUseCase.execute(controller, stringPresenter);
      expect(output).toBe('NEIN');
    })();
  });

  test('AsyncOutputPort', () => {
    (async () => {
      const service = new Service();
      const isEvenNumberUseCase = new IsEvenNumberUseCase(service);
      const controller = () => 124;
      const stringPresenter = new StringPresenter();
      const output = await isEvenNumberUseCase.execute(controller, stringPresenter.present);
      expect(output).toBe('JA');
    })();
  });

  test('ResultUseCase', async () => {
    const useCase = new ResultUseCase();
    const controller = () => 4;
    const resultPresenter: AsyncOutputPortFunction<Result<Promise<Boolean>>, string> = async (result) => {
      return (await result.get()) ? 'JA' : 'NEIN';
    };
    const result = await useCase.execute(controller, resultPresenter);
    expect(result).toBe('JA');
  });
});
