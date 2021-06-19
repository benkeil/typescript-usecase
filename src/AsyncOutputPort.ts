import AsyncOutputPortFunction from './AsyncOutputPortFunction';

export default interface AsyncOutputPort<I, O> {
  present: AsyncOutputPortFunction<I, O>;
}
