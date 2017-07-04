const testsContext = require.context('.', true, /Spec.js$/);
testsContext.keys().forEach(testsContext);
