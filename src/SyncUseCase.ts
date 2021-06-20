export type SyncUseCaseFunction<I, O> = [I] extends [void]
  ? [O] extends [void]
    ? () => void
    : <R>(outputPort: (result: O) => R) => R
  : [O] extends [void]
  ? (inputPort: () => I) => void
  : <R>(inputPort: () => I, outputPort: (result: O) => R) => R;

export interface SyncUseCase<I, O> {
  execute: SyncUseCaseFunction<I, O>;
}

export type SyncOutputPortFunction<I, O> = [I] extends [void] ? () => void : (result: I) => O;

export interface SyncOutputPort<I, O> {
  present: SyncOutputPortFunction<I, O>;
}
