const getUnhandledProps = (Component, props) => {

  const { propTypes = {} } = Component;
  const handledProps = Object.keys(propTypes);
  return Object.keys(props).reduce((acc, prop) => {
    if (prop === 'componentClass') return acc;
    if (handledProps.indexOf(prop) === -1) acc[prop] = props[prop];
    return acc;
  }, {});

};

export default getUnhandledProps;
