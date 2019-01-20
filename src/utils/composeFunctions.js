export default (...fns) => first => fns.reduce((previousValue, fn) => fn(previousValue), first);
