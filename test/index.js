import '@babel/polyfill';

export const globalKey = 'rs';
export const namespace = `${globalKey}-picker`;

function runAllTests(tests) {
  tests.keys().forEach(tests);
}

runAllTests(require.context('../src', true, /Spec.js$/));
