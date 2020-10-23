import React from 'react';
import PropTypes from 'prop-types';
import { createContext, useClassNames } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface FormGroupProps extends WithAsProps {
  /**
   * Sets id on `<Form.Control>` and `htmlFor` on `<Form.ControlLabel>`.
   * And generate ʻaria-labelledby` and ʻaria-describedby` for `<Form.Control>`.
   */
  controlId?: string;
}

export const FormGroupContext = createContext({});

const FormGroup: RsRefForwardingComponent<'div', FormGroupProps> = React.forwardRef(
  (props: FormGroupProps, ref) => {
    const {
      as: Component = 'div',
      classPrefix = 'form-group',
      controlId,
      className,
      ...rest
    } = props;

    const { withClassPrefix, merge } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());

    return (
      <FormGroupContext.Provider value={{ controlId }}>
        <Component {...rest} ref={ref} className={classes} role="group" />
      </FormGroupContext.Provider>
    );
  }
);

FormGroup.displayName = 'FormGroup';
FormGroup.propTypes = {
  controlId: PropTypes.string,
  className: PropTypes.string,
  classPrefix: PropTypes.string
};

export default FormGroup;
