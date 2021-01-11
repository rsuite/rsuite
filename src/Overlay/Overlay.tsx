import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import BaseOverlay, { BaseOverlayProps } from './BaseOverlay';
import Fade from '../Animation/Fade';
import refType from '../utils/refType';

export interface OverlayProps extends BaseOverlayProps {
  animation?: boolean;
}

const Overlay = ({ animation = true, children, transition = Fade, ...rest }: OverlayProps) => {
  let child = children as React.DetailedReactHTMLElement<any, HTMLElement>;
  if (!animation) {
    transition = undefined;
  }

  if (!transition) {
    child = React.Children.only(child);
    child = React.cloneElement(child, {
      className: classNames('in', child.props.className)
    });
  }

  return (
    <BaseOverlay {...rest} transition={transition}>
      {child}
    </BaseOverlay>
  );
};

Overlay.propTypes = {
  animation: PropTypes.bool,
  container: PropTypes.any,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  onRendered: PropTypes.func,
  className: PropTypes.string,
  containerPadding: PropTypes.number,
  placement: PropTypes.string,
  shouldUpdatePosition: PropTypes.bool,
  preventOverflow: PropTypes.bool,
  show: PropTypes.bool,
  rootClose: PropTypes.bool,
  transition: PropTypes.elementType,
  positionRef: refType,
  target: PropTypes.func,
  onHide: PropTypes.func,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func
};

export default Overlay;
