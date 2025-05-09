import React, { useMemo } from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef } from '@/internals/utils';
import { useStyles, useCustom, useUniqueId } from '@/internals/hooks';

export interface FormGroupProps extends BoxProps {
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
  const helpTextId = `${id}-help-text`;
  const labelId = `${id}-label`;
  const errorMessageId = `${id}-error-message`;

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
const FormGroup = forwardRef<'div', FormGroupProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('FormGroup', props);
  const {
    as,
    classPrefix = 'form-group',
    controlId: controlIdProp,
    className,
    ...rest
  } = propsWithDefaults;

  const { withPrefix, merge } = useStyles(classPrefix);
  const classes = merge(className, withPrefix());
  const controlId = useUniqueId('rs-', controlIdProp);

  const contextValue = useMemo(() => ({ controlId }), [controlId]);

  return (
    <FormGroupContext.Provider value={contextValue}>
      <Box as={as} {...rest} ref={ref} className={classes} role="group" />
    </FormGroupContext.Provider>
  );
});

FormGroup.displayName = 'FormGroup';

export default FormGroup;
