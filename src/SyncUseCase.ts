export interface SyncUseCase<I, O> {
  execute: I extends void
    ? O extends void
      ? <R>() => R
      : <R>(outputPort: (result: O) => R) => R
    : O extends void
    ? <R>(inputPort: () => I) => R
    : <R>(inputPort: () => I, outputPort: (result: O) => R) => R;
}

export type SyncOutputPortFunction<I, O> = I extends void ? () => O : (result: I) => O;

export interface SyncOutputPort<I, O> {
  present: SyncOutputPortFunction<I, O>;
}
