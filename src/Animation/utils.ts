import PropTypes from 'prop-types';

export function getAnimationEnd() {
  const style = document.createElement('div').style;
  if ('webkitAnimation' in style) {
    return 'webkitAnimationEnd';
  }

  return 'animationend';
}

export const animationPropTypes = {
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func
};
