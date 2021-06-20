import { ReactiveUseCase } from './ReactiveUseCase';
import { Observable, of } from 'rxjs';

class VoidVoidUseCase implements ReactiveUseCase<void, void> {
  execute(): void {}
}

class VoidNumberUseCase implements ReactiveUseCase<void, number> {
  execute<R>(outputPort: (result$: Observable<number>) => Observable<R>): Observable<R> {
    return outputPort(of(1));
  }
}

class NumberVoidUseCase implements ReactiveUseCase<number, void> {
  execute(inputPort: () => number): void {}
}

class NumberNumberUseCase implements ReactiveUseCase<number, number> {
  execute<R>(inputPort: () => number, outputPort: (result$: Observable<number>) => Observable<R>): Observable<R> {
    return outputPort(of(inputPort()));
  }
}

describe('ReactiveUseCase', () => {
  test('VoidVoidUseCase', () => {
    const useCase = new VoidVoidUseCase();
    useCase.execute();
  });

  test('VoidNumberUseCase', (done) => {
    const useCase = new VoidNumberUseCase();
    const view = useCase.execute((result) => result);
    view.subscribe((value) => {
      expect(value).toBe(1);
      done();
    });
  });

  test('NumberVoidUseCase', () => {
    const useCase = new NumberVoidUseCase();
    useCase.execute(() => 1);
  });

  test('NumberNumberUseCase', (done) => {
    const useCase = new NumberNumberUseCase();
    const view = useCase.execute(
      () => 1,
      (result) => result,
    );
    view.subscribe((value) => {
      expect(value).toBe(1);
      done();
    });
  });
});
