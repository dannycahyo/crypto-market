/* eslint-disable @typescript-eslint/no-explicit-any */
// This expected to be any, since it can be any function

function curry(totalArg: number, fn: any) {
  const args: any = [];
  return function inner(arg: any) {
    args.push(arg);
    if (args.length === totalArg) return fn(...args);
    return inner;
  };
}

export { curry };
