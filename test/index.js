import '@babel/polyfill';

export const globalKey = 'rs';
export const namespace = `${globalKey}-picker`;

function importAll(r) {
  r.keys().forEach(r);
}

importAll(require.context('../src/Avatar/test', true, /Spec.js$/));
