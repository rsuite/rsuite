import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../Tooltip';
import Whisper from '../Whisper';
import { useClassNames } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { FormGroupContext } from '../FormGroup/FormGroup';
import HelpO from '@rsuite/icons/legacy/HelpO';

export interface FormHelpTextProps extends WithAsProps {
  /** Whether to show through the Tooltip component */
  tooltip?: boolean;
}

const FormHelpText: RsRefForwardingComponent<'span', FormHelpTextProps> = React.forwardRef(
  (props: FormHelpTextProps, ref) => {
    const {
      as: Component = 'span',
      classPrefix = 'form-help-text',
      className,
      tooltip,
      children,
      ...rest
    } = props;

    const { controlId } = useContext(FormGroupContext);
    const { withClassPrefix, merge } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix({ tooltip }));

    if (tooltip) {
      return (
        <Whisper ref={ref} placement="topEnd" speaker={<Tooltip {...rest}>{children}</Tooltip>}>
          <Component className={classes}>
            <HelpO />
          </Component>
        </Whisper>
      );
    }

    return (
      <Component
        id={controlId ? `${controlId}-help-text` : null}
        {...rest}
        ref={ref}
        className={classes}
      >
        {children}
      </Component>
    );
  }
);

FormHelpText.displayName = 'FormHelpText';
FormHelpText.propTypes = {
  className: PropTypes.string,
  tooltip: PropTypes.bool,
  children: PropTypes.node,
  classPrefix: PropTypes.string
};

export default FormHelpText;
