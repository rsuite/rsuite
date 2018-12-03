export default function isOneOf(one: string, ofTarget: string[]) {
  if (Array.isArray(ofTarget)) {
    return ofTarget.indexOf(one) >= 0;
  }
  return one === ofTarget;
}
