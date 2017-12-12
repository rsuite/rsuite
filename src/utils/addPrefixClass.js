
/* @flow */

import PropTypes from 'prop-types';

export const globalClassName: string = 'rsuite';

export default function decorate(skin: Object = {
  prefixClass: globalClassName
}): Function {
  return (Component) => {

    const { prefixClass } = skin;
    const propTypes: Object = Component.propTypes || (Component.propTypes = {});
    const defaultProps: Object = Component.defaultProps || (Component.defaultProps = {});

    propTypes.prefixClass = PropTypes.string;
    defaultProps.prefixClass = prefixClass;

    Component.prototype.prefix = className => `${prefixClass}-${className}`;

    return Component;
  };
}
