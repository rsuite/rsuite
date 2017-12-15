
/* @flow */

import PropTypes from 'prop-types';

export const globalClassName: string = 'rsuite';

export default function decorate(skin: Object = {
  classPrefix: globalClassName
}): Function {
  return (Component) => {

    const { classPrefix } = skin;
    const propTypes: Object = Component.propTypes || (Component.propTypes = {});
    const defaultProps: Object = Component.defaultProps || (Component.defaultProps = {});

    propTypes.classPrefix = PropTypes.string;
    defaultProps.classPrefix = classPrefix;

    Component.prototype.prefix = className => `${classPrefix}-${className}`;

    return Component;
  };
}
