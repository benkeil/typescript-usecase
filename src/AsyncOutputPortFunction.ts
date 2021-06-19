type AsyncOutputPortFunction<I, O> = I extends void ? () => O : (result: I) => O | Promise<O>;

export default AsyncOutputPortFunction;
