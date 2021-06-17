export interface AsyncUseCase<I, O> {
  execute: I extends void
    ? O extends void
      ? <R>() => Promise<R>
      : <R>(outputPort: (result: Promise<O>) => Promise<R>) => Promise<R>
    : O extends void
    ? <R>(inputPort: () => I) => Promise<R>
    : <R>(inputPort: () => I, outputPort: (result: Promise<O>) => Promise<R>) => Promise<R>;
}

export type AsyncOutputPortFunction<I, O> = I extends void ? () => O : (result: Promise<I>) => Promise<O>;

export interface AsyncOutputPort<I, O> {
  present: AsyncOutputPortFunction<I, O>;
}
