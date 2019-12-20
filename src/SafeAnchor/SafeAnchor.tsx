import * as React from 'react';
import PropTypes from 'prop-types';
import { SafeAnchorProps } from './SafeAnchor.d';

const SafeAnchor: React.FunctionComponent = React.forwardRef<'SafeAnchor', SafeAnchorProps>(
  (props, ref) => {
    const { componentClass: Component = 'a', disabled, ...rest } = props;
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

    return <Component ref={ref} {...rest} onClick={handleClick} />;
  }
);

SafeAnchor.displayName = 'SafeAnchor';
SafeAnchor.propTypes = {
  disabled: PropTypes.bool,

  /** @default 'a' */
  componentClass: PropTypes.elementType
};

export default SafeAnchor;
