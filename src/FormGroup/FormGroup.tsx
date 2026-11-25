/* @jsxRuntime classic */
import React, { useContext, useMemo } from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef } from '@/internals/utils';
import { useStyles, useCustom, useUniqueId } from '@/internals/hooks';
import { FormGroupContext } from './FormGroupContext';
import { CustomContext } from '@/internals/Provider/CustomContext';
import { getStaticRelations, registerFormGroupPart } from './formGroupRelations';
import { useFormGroupRelations } from './useFormGroupRelations';

export interface FormGroupProps extends BoxProps {
  /**
   * Sets id on `<Form.Control>` and `htmlFor` on `<Form.ControlLabel>`.
   * Form.Control associates with registered label and inline help IDs in this group.
   * Custom roots must forward the assigned ID to their label or help element.
   * Custom components retain legacy default ID links in server output until mount.
   * For custom IDs or optional content inside such components, use explicit
   * aria-labelledby/aria-describedby on Form.Control for accurate server relationships.
   */
  controlId?: string;
}

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
  const { components } = useContext(CustomContext);
  const relations = useFormGroupRelations(
    getStaticRelations(rest.children, controlId, {
      label: components?.FormControlLabel?.defaultProps,
      helpText: components?.FormHelpText?.defaultProps
    })
  );

  const { labelledBy, describedBy, register } = relations;
  const contextValue = useMemo(
    () => ({ controlId, labelledBy, describedBy, register }),
    [controlId, labelledBy, describedBy, register]
  );

  return (
    <FormGroupContext.Provider value={contextValue}>
      <Box as={as} {...rest} ref={ref} className={classes} role="group" />
    </FormGroupContext.Provider>
  );
});

FormGroup.displayName = 'FormGroup';
registerFormGroupPart(FormGroup, 'group');

export default FormGroup;
