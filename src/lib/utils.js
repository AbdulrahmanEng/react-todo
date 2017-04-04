export const partial = (fn, ...args) => {
  return fn.bind(null, ...args)
};