import zipObject from './zipObject'

const objectPromiseAll = obj => {
  const keys = Object.keys(obj)
  return Promise.all(
    keys.map(key => {
      const value = obj[key]
      if (typeof value === 'object' && !value.then) {
        return objectPromiseAll(value)
      }
      return value
    })
  ).then(result => zipObject(keys, result))
}

export default objectPromiseAll
