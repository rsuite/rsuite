/**
 * https://zh-hans.reactjs.org/docs/higher-order-components.html#static-methods-must-be-copied-over
 */

const REACT_STATICS = [
  'childContextTypes',
  'contextType',
  'contextTypes',
  'getDefaultProps',
  'getDerivedStateFromError',
  'getDerivedStateFromProps',
  'defaultProps',
  'propTypes'
];

function extendReactStatics(targetComponent, sourceComponent, blacklist: string[] = []) {
  for (let i = 0; i < REACT_STATICS.length; i++) {
    const key = REACT_STATICS[i];
    const hasDescriptor = Object.getOwnPropertyDescriptor(targetComponent, key);
    const descriptor = Object.getOwnPropertyDescriptor(sourceComponent, key);

    if (blacklist.includes(key) || !descriptor || hasDescriptor) {
      continue;
    }

    try {
      Object.defineProperty(targetComponent, key, descriptor);
    } catch (e) {
      // Avoid failures from read-only properties
    }
  }
}

export default extendReactStatics;
