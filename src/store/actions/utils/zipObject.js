export default (keys, values) =>
  keys.reduce(
    (accumulator, key, index) => ({
      ...accumulator,
      [key]: values[index]
    }),
    {}
  )
