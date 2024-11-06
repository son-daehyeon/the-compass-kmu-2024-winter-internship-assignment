function isEmpty(value) {
  return (typeof value === 'string' && value === '')
    || (Array.isArray(value) && value.every(isEmpty))
    || (value instanceof Object && Object.values(value).every(isEmpty))
    || value === null || value === undefined;
}