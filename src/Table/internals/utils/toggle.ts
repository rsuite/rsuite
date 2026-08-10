/**
 * Selectively calls either method a or b based on the condition.
 * @param a - Function to be called when the condition is true
 * @param b - Function to be called when the condition is false
 * @returns A function that takes a target element and additional values,
 *          which in turn returns a function that takes a condition
 */
function toggle(a: (...args: any[]) => void, b: (...args: any[]) => void) {
  return (target: HTMLElement, ...value: any[]) => {
    const options = [target, ...value];
    return (condition: boolean) => {
      if (condition) {
        a(...options);
      } else {
        b(...options);
      }
    };
  };
}

export default toggle;
