export function composeFunctions(...fns: any[]) {
  return (first: any) => fns.reduce((previousValue, fn) => fn(previousValue), first);
}

export default composeFunctions;
