// @flow

import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { defaultProps, prefix } from './utils';
import placementPolyfill from './utils/placementPolyfill';
import { FormGroupContext } from './FormGroup';

type PlacementEightPoints =
  | 'bottomStart'
  | 'bottomEnd'
  | 'topStart'
  | 'topEnd'
  | 'leftStart'
  | 'rightStart'
  | 'leftEnd'
  | 'rightEnd';

type Props = {
  htmlFor?: string,
  show?: boolean,
  classPrefix: string,
  children?: React.Node,
  className?: string,
  placement?: PlacementEightPoints
};

class ErrorMessage extends React.Component<Props> {
  render() {
    const { className, show, classPrefix, children, placement, htmlFor, ...props } = this.props;

    if (!show) {
      return null;
    }

    const addPrefix = prefix(classPrefix);
    const wrapClasses = classNames(addPrefix('wrapper'), className, {
      [addPrefix(`placement-${_.kebabCase(placementPolyfill(placement))}`)]: placement
    });
    const classes = classNames(classPrefix, addPrefix('show'));

    return (
      <div {...props} className={wrapClasses}>
        <FormGroupContext.Consumer>
          {controlId => (
            <div className={classes} htmlFor={htmlFor || controlId}>
              <span className={addPrefix('arrow')} />
              <span className={addPrefix('inner')}>{children}</span>
            </div>
          )}
        </FormGroupContext.Consumer>
      </div>
    );
  }
}

export default defaultProps({
  classPrefix: 'error-message'
})(ErrorMessage);
