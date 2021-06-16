import { Observable } from 'rxjs';

export default interface ReactiveUseCase<I, O> {
  execute: I extends void
    ? O extends void
      ? <R>() => Observable<R>
      : <R>(outputPort: (result$: Observable<O>) => Observable<R>) => Observable<R>
    : O extends void
    ? <R>(inputPort: () => I) => Observable<R>
    : <R>(inputPort: () => I, outputPort: (result$: Observable<O>) => Observable<R>) => Observable<R>;
}
