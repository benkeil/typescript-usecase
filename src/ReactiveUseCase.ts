import { Observable } from 'rxjs';

export type ReactiveUseCaseFunction<I, O> = [I] extends [void]
  ? [O] extends [void]
    ? () => void
    : <R>(outputPort: (result$: Observable<O>) => Observable<R>) => Observable<R>
  : [O] extends [void]
  ? (inputPort: () => I) => void
  : <R>(inputPort: () => I, outputPort: (result$: Observable<O>) => Observable<R>) => Observable<R>;

export interface ReactiveUseCase<I, O> {
  execute: ReactiveUseCaseFunction<I, O>;
}

export type ReactiveOutputPortFunction<I, O> = [I] extends [void]
  ? () => void
  : (result$: Observable<I>) => Observable<O>;

export interface ReactiveOutputPort<I, O> {
  present: ReactiveOutputPortFunction<I, O>;
}
