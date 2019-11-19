function omitUndefined(obj) {
  return Object.keys(obj).reduce((acc, item) => {
    if (obj[item] !== undefined) {
      acc[item] = obj[item]
    }
    return acc
  }, {})
}

module.exports = omitUndefined;