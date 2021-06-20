export type AsyncUseCaseFunction<I, O> = [I] extends [void]
  ? [O] extends [void]
    ? () => Promise<void>
    : <R>(outputPort: (result: O) => Promise<R>) => Promise<R>
  : [O] extends [void]
  ? (inputPort: () => I) => Promise<void>
  : <R>(inputPort: () => I, outputPort: (result: O) => Promise<R>) => Promise<R>;

export interface AsyncUseCase<I, O> {
  execute: AsyncUseCaseFunction<I, O>;
}

export type AsyncOutputPortFunction<I, O> = [I] extends [void] ? () => void : (result: I) => Promise<O>;

export interface AsyncOutputPort<I, O> {
  present: AsyncOutputPortFunction<I, O>;
}
