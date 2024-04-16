import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useClassNames, useUniqueId } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface FormGroupProps extends WithAsProps {
  /**
   * Sets id on `<Form.Control>` and `htmlFor` on `<Form.ControlLabel>`.
   * And generate ʻaria-labelledby` and ʻaria-describedby` for `<Form.Control>`.
   */
  controlId?: string;
}

const FormGroupContext = React.createContext<{ controlId?: string }>({});

export const useFormGroup = (controlId?: string) => {
  const context = React.useContext(FormGroupContext);
  const fallbackId = useUniqueId('rs-');

  const id = controlId || context.controlId || fallbackId;
  const helpTextId = `${controlId}-help-text`;
  const labelId = `${controlId}-label`;
  const errorMessageId = `${controlId}-error-message`;

  return {
    /**
     * The `id` of the `<Form.Control>` component.
     */
    controlId: id,
    /**
     * The `id` of the `<Form.HelpText>` component.
     */
    helpTextId,

    /**
     * The `id` of the `<Form.ControlLabel>` component.
     */
    labelId,

    /**
     * The `id` of the `<Form.ErrorMessage>` component.
     */
    errorMessageId
  };
};

/**
 * The `<Form.Group>` component is the easiest way to add some structure to forms.
 * @see https://rsuitejs.com/components/form/
 */
const FormGroup: RsRefForwardingComponent<'div', FormGroupProps> = React.forwardRef(
  (props: FormGroupProps, ref) => {
    const {
      as: Component = 'div',
      classPrefix = 'form-group',
      controlId: controlIdProp,
      className,
      ...rest
    } = props;

    const { withClassPrefix, merge } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());
    const controlId = useUniqueId('rs-', controlIdProp);

    const contextValue = useMemo(() => ({ controlId }), [controlId]);

    return (
      <FormGroupContext.Provider value={contextValue}>
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
