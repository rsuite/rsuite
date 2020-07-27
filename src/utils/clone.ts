export default function clone(data: any) {
  if (data !== undefined) {
    return JSON.parse(JSON.stringify(data));
  }
  return null;
}
