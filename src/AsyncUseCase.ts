export type AsyncOutputPortFunction<I, O> = I extends void ? () => O : (result: I) => O | Promise<O>;

export interface AsyncUseCase<I, O> {
  execute: I extends void
    ? O extends void
      ? <R>() => Promise<R>
      : <R>(outputPort: AsyncOutputPortFunction<O, R>) => Promise<R>
    : O extends void
    ? <R>(inputPort: () => I) => Promise<R>
    : <R>(inputPort: () => I, outputPort: AsyncOutputPortFunction<O, R>) => Promise<R>;
}

export interface AsyncOutputPort<I, O> {
  present: AsyncOutputPortFunction<I, O>;
}
