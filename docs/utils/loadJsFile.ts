export default function loadJsFile(url, callback) {
  const s = document.createElement('script');
  const head = document.getElementsByTagName('head')[0];
  s.type = 'text/javascript';
  s.charset = 'utf-8';
  s.src = url;
  s.onload = () => {
    callback && callback();
  };
  head.insertBefore(s, head.firstChild);
  return s;
}
