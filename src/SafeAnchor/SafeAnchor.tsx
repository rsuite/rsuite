import * as React from 'react';
import PropTypes from 'prop-types';
import { SafeAnchorProps } from './SafeAnchor.d';

const SafeAnchor = React.forwardRef((props: SafeAnchorProps, ref: React.Ref<HTMLElement>) => {
  const { as: Component = 'a', disabled, ...rest } = props;
  const handleClick = (event: React.MouseEvent) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    rest.onClick?.(event);
  };

  if (disabled) {
    rest.tabIndex = -1;
    rest['aria-disabled'] = true;
  }

  return <Component {...rest} ref={ref} onClick={handleClick} />;
});

SafeAnchor.displayName = 'SafeAnchor';
SafeAnchor.propTypes = {
  disabled: PropTypes.bool,

  /** @default 'a' */
  as: PropTypes.elementType
};

export default SafeAnchor;
