export const guid = (num = 8) => (Math.random() * 1e18).toString(36).slice(0, num);
export const getFiles = (
  event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLInputElement>
) => {
  if (typeof event?.['dataTransfer'] === 'object') {
    return event?.['dataTransfer']?.files;
  }
  if (event.target) {
    return event.target['files'];
  }
  return [];
};
