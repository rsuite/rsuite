export default function clone(data) {
  if (data !== undefined) {
    return JSON.parse(JSON.stringify(data));
  }
  return null;
}
