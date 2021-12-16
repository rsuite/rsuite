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
