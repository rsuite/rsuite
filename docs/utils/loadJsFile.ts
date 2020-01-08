export default function loadJsFile(url, callback) {
  const s = document.createElement('script');
  const head = document.getElementsByTagName('head')[0];
  s.type = 'text/javascript';
  //注意服务器返回的JS的编码需与这里的设置一致
  s.charset = 'utf-8';
  s.src = url;
  s.onload = () => {
    callback && callback();
  };
  head.insertBefore(s, head.firstChild);
  return s;
}
