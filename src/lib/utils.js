export const partial = (fn, ...args) => {
  return fn.bind(null, ...args);
};

export const insidePipe = (f, g) => (...args) => g(f(...args));
// Reduces multiple functions to one
export const pipe = (...fns) => fns.reduce(insidePipe);