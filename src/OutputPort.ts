export default interface OutputPort<I, O> {
  present: I extends void ? () => O : (result: I) => O;
}
