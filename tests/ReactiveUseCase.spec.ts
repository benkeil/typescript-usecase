import ReactiveUseCase from '../src/ReactiveUseCase';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

class SimpleUseCase implements ReactiveUseCase<number, string> {
  execute<R>(inputPort: () => number, outputPort: (result: Observable<string>) => R): R {
    return outputPort(of(String(inputPort())));
  }
}

describe('ReactiveUseCase', () => {
  test('execute', (done) => {
    const useCase = new SimpleUseCase();
    useCase
      .execute(
        () => 123,
        (result) => result.pipe(map((value) => value.length)),
      )
      .subscribe((value) => {
        expect(value).toBe(3);
        done();
      });
  });
});
