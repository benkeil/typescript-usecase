import { Observable } from 'rxjs';

export type ReactiveOutputPortFunction<I, O> = I extends void
  ? () => Observable<O>
  : (result$: Observable<I>) => Observable<O>;

export interface ReactiveUseCase<I, O> {
  execute: I extends void
    ? O extends void
      ? <R>() => Observable<R>
      : <R>(outputPort: ReactiveOutputPortFunction<O, R>) => Observable<R>
    : O extends void
    ? <R>(inputPort: () => I) => Observable<R>
    : <R>(inputPort: () => I, outputPort: ReactiveOutputPortFunction<O, R>) => Observable<R>;
}

export interface ReactiveOutputPort<I, O> {
  present: ReactiveOutputPortFunction<I, O>;
}
