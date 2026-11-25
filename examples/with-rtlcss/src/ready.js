import { loadCssFile, readDirection } from './utils';

const direction = readDirection();

export default function ready(callback) {
  const cssFile = direction === 'rtl' ? '/css/style.rtl.css' : '/css/style.css';
  loadCssFile(cssFile).then(callback);
}
