export default function guid() {
  return '_' + Math.random().toString(36).substring(2, 14);
}
