export default (file: File, callback: (result: string) => Promise<any> | void) => {
  const img = document.createElement('img');
  const objectUrl = window.URL.createObjectURL(file);
  img.src = objectUrl;
  img.onload = () => {
    Promise.all([callback(objectUrl)]).finally(() => {
      window.URL.revokeObjectURL(objectUrl);
    });
  };
};
