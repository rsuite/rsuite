import React from 'react';
import InputGroup from '../../InputGroup';

interface PickerLabelProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  as?: React.ElementType;
}

const PickerLabel = ({
  children,
  className,
  as: Component = InputGroup.Addon,
  ...rest
}: PickerLabelProps) => {
  return children ? (
    <Component data-testid="picker-label" className={className} {...rest}>
      {children}
    </Component>
  ) : null;
};

export default PickerLabel;
