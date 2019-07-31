/**
 * Returns an object consisting of props beyond the scope of the Component.
 * Useful for getting and spreading unknown props from the user.
 * @param {function} Component A function or ReactClass.
 * @param {object} props A ReactElement props object
 * @returns {{}} A shallow copy of the prop object
 */

const getUnhandledProps = (Component: any, props: any) => {
  /**
   * Note that `handledProps` are generated automatically during
   * build with `babel-plugin-transform-react-flow-handled-props`
   */
  const { handledProps = [], propTypes = {} } = Component;
  const propTypeKeys = Object.keys(propTypes);

  return Object.keys(props).reduce((acc: any, prop: string) => {
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

export default getUnhandledProps;
