import '@babel/polyfill';

function importAll(r) {
  r.keys().forEach(r);
}

importAll(require.context('.', true, /Spec.js$/));
