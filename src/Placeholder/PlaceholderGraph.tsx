import * as React from 'react';
import PropTypes from 'prop-types';
import { defaultProps, getUnhandledProps, prefix } from '../utils';
import classNames from 'classnames';
import { PlaceholderGraphProps } from './PlaceholderGraph.d';

class PlaceholderGraph extends React.Component<PlaceholderGraphProps> {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    classPrefix: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    active: PropTypes.bool
  };
  static defaultProps = {
    height: 200
  };

  render() {
    const { className, width, height, style, active, classPrefix, ...rest } = this.props;
    const addPrefix = prefix(classPrefix);
    const unhandled = getUnhandledProps(PlaceholderGraph, rest);
    const classes = classNames(classPrefix, addPrefix('graph'), className, {
      [addPrefix('active')]: active
    });
    return (
      <div
        className={classes}
        style={{
          width: width || '100%',
          height,
          ...style
        }}
        {...unhandled}
      />
    );
  }
}

export default defaultProps<PlaceholderGraphProps>({
  classPrefix: 'placeholder'
})(PlaceholderGraph);
