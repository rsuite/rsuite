function runAllTests(tests) {
  tests.keys().forEach(tests);
}

runAllTests(require.context('../src', true, /Spec.js$/));
