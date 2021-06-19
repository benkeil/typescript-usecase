export interface AsyncUseCase<I, O> {
  execute: I extends void
    ? O extends void
      ? <R>() => Promise<R>
      : <R>(outputPort: (result: O) => R | Promise<R>) => Promise<R>
    : O extends void
    ? <R>(inputPort: () => I) => Promise<R>
    : <R>(inputPort: () => I, outputPort: (result: O) => R | Promise<R>) => Promise<R>;
}

export type AsyncOutputPortFunction<I, O> = I extends void ? () => O : (result: I) => O | Promise<O>;

export interface AsyncOutputPort<I, O> {
  present: AsyncOutputPortFunction<I, O>;
}
