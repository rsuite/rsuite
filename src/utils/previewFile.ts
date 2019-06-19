export default (file: File, callback: (result: string | ArrayBuffer) => void) => {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
};
