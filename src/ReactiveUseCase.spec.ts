import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReactiveOutputPortFunction, ReactiveUseCase } from './ReactiveUseCase';

class NumberToStringUseCase implements ReactiveUseCase<number, string> {
  execute<R>(inputPort: () => number, outputPort: (result: Observable<string>) => R): R {
    return outputPort(of(String(inputPort())));
  }
}

describe('ReactiveUseCase', () => {
  test('execute', (done) => {
    const useCase = new NumberToStringUseCase();
    const controller = () => 123;
    const stringLengthPresenter: ReactiveOutputPortFunction<string, number> = (result$) => {
      return result$.pipe(map((value) => value.length));
    };
    useCase.execute(controller, stringLengthPresenter).subscribe((value) => {
      expect(value).toBe(3);
      done();
    });
  });
});
