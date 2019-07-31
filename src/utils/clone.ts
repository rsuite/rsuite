export default function clone(data: object) {
  if (data !== undefined) {
    return JSON.parse(JSON.stringify(data));
  }
  return null;
}
