import { loadCssFile, readDirection } from './utils';

const direction = readDirection();

export default function ready(callback) {
  const cssFile = direction === 'rtl' ? '/css/theme-default.rtl.css' : '/css/theme-default.css';
  loadCssFile(cssFile).then(callback);
}
