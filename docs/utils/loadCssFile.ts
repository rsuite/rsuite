export default function loadCssFile(url: string, id = 'default') {
  return new Promise(resolve => {
    const container = document.getElementsByTagName('head')[0];
    const link = document.createElement('link');
    const version = localStorage.getItem('version');
    link.id = id;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = `${url}?${version}`;
    link.onload = function() {
      resolve();
    };
    container.appendChild(link);
  });
}
