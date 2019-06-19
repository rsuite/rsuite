export default (...fns: any[]) => (first: any) =>
  fns.reduce((previousValue, fn) => fn(previousValue), first);
