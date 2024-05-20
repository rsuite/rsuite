import { warnOnce } from '@/internals/utils';
import './chai-assertions.js';

/**
 * Prevent `JSON.stringify`ing an element that has been processed by React
 * from throwing "Converting circular structure to JSON" error
 */
const stringify = JSON.stringify;
JSON.stringify = function (subject, ...args) {
  if (Object.getOwnPropertyNames(subject).some(key => /_+react/.test(key))) {
    // Skip _react* and __react* properties
    return stringify.call(this, subject, function (key, value) {
      if (/_+react/.test(key)) {
        return undefined;
      }
      return value;
    });
  }
  return stringify.call(this, subject, ...args);
}.bind(JSON);

// Throw errors when a `console.error` or `console.warn` happens
// by overriding the functions
['error', 'warn'].forEach(type => {
  console[type] = (...args) => {
    console.log(args);
    if (args[0].indexOf('Warning') === 0) {
      throw new Error(args);
    }
  };
});

let pendingError = null;

window.addEventListener('error', event => {
  pendingError = event.error;
});
window.addEventListener('unhandledrejection', event => {
  pendingError = event.reason;
});

// Ensure that uncaught exceptions between tests result in the tests failing.
afterEach(() => {
  sinon.restore();

  if (pendingError) {
    throw pendingError;
  }

  warnOnce._resetWarned();
});
