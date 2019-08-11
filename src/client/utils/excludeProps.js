export default function excludeProps(props, forExclude) {
  return Object.getOwnPropertyNames(props).reduce((acc, propName) => {
    if (forExclude.indexOf(propName) === -1) {
      acc[propName] = props[propName]
    }
    return acc;
  }, {})
}