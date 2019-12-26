"use strict";

exports.__esModule = true;
exports.default = void 0;

/**
 * Returns an object consisting of props beyond the scope of the Component.
 * Useful for getting and spreading unknown props from the user.
 * @param {function} Component A function or ReactClass.
 * @param {object} props A ReactElement props object
 * @returns {{}} A shallow copy of the prop object
 */
var getUnhandledProps = function getUnhandledProps(Component, props) {
  /**
   * Note that `handledProps` are generated automatically during
   * build with `babel-plugin-transform-react-flow-handled-props`
   */
  var _Component$handledPro = Component.handledProps,
      handledProps = _Component$handledPro === void 0 ? [] : _Component$handledPro,
      _Component$propTypes = Component.propTypes,
      propTypes = _Component$propTypes === void 0 ? {} : _Component$propTypes;
  var propTypeKeys = Object.keys(propTypes);
  return Object.keys(props).reduce(function (acc, prop) {
    if (prop === 'childKey') {
      return acc;
    }

    if (handledProps.length > 0 && handledProps.indexOf(prop) === -1) {
      acc[prop] = props[prop];
    }

    if (propTypeKeys.length > 0 && propTypeKeys.indexOf(prop) === -1) {
      acc[prop] = props[prop];
    }

    return acc;
  }, {});
};

var _default = getUnhandledProps;
exports.default = _default;
module.exports = exports.default;