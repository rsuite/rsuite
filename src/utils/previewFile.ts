// https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
const MIME = [
  'image/apng',
  'image/avif',
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/webp'
];

export function isImage(file) {
  return MIME.includes(file?.type);
}

export default (file: File, callback: (result: string | ArrayBuffer | null) => void) => {
  if (!isImage(file)) {
    return callback(null);
  }

  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
};
