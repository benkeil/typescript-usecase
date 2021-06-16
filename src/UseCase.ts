export default interface UseCase<I, O> {
  execute: I extends void
    ? O extends void
      ? <R>() => R
      : <R>(outputPort: (result: O) => R) => R
    : O extends void
    ? <R>(inputPort: () => I) => R
    : <R>(inputPort: () => I, outputPort: (result: O) => R) => R;
}
