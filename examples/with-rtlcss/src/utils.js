export function loadCssFile(url, id = 'rsuite-theme') {
  return new Promise(resolve => {
    const container = document.getElementsByTagName('head')[0];
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    link.onload = function() {
      resolve();
    };
    container.appendChild(link);
  });
}

export const readDirection = () => localStorage.getItem('direction');
export const writeDirection = dir => {
  localStorage.setItem('direction', dir);
  const cssFile = dir === 'rtl' ? '/css/theme-default.rtl.css' : '/css/theme-default.css';
  document.getElementById('rsuite-theme').href = cssFile;
  document.dir = dir;
};
