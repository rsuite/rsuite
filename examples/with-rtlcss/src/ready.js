import { loadCssFile, useDirection } from './utils';

const [direction] = useDirection();

export default function ready(callback) {
  const cssFile = direction === 'rtl' ? '/css/theme-default.rtl.css' : '/css/theme-default.css';
  loadCssFile(cssFile).then(callback);
}
