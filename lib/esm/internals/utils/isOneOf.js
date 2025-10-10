'use client';
export function isOneOf(one, ofTarget) {
  if (Array.isArray(ofTarget)) {
    return ofTarget.indexOf(one) >= 0;
  }
  return one === ofTarget;
}
export default isOneOf;