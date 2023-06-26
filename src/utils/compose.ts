type Func<T, R> = (arg: T) => R;

// This expected to be any, since it can be any function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function compose<T extends R, R>(...funcs: Array<Func<any, any>>): Func<T, R> {
  return function (arg: T): R {
    return funcs.reduceRight((result, func) => func(result), arg);
  };
}

export { compose };
