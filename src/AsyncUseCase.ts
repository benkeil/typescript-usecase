export default interface AsyncUseCase<I, O> {
  execute: I extends void
    ? O extends void
      ? <R>() => Promise<R>
      : <R>(outputPort: (result: O) => R | Promise<R>) => Promise<R>
    : O extends void
    ? <R>(inputPort: () => I) => Promise<R>
    : <R>(inputPort: () => I, outputPort: (result: O) => R | Promise<R>) => Promise<R>;
}
