import React from 'react';
import Icon from '@rsuite/icons/Icon';
import AngleDownIcon from '@rsuite/icons/legacy/AngleDown';
import { useClassNames } from '@/internals/hooks';

interface AccordionButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  expanded?: boolean;
  controlId?: string;
  classPrefix?: string;
  caretAs?: React.ElementType;
  disabled?: boolean;
}

const AccordionButton = (props: AccordionButtonProps) => {
  const {
    classPrefix = 'panel-btn',
    expanded,
    id,
    className,
    controlId,
    children,
    disabled,
    caretAs = AngleDownIcon,
    ...rest
  } = props;
  const { prefix, withClassPrefix } = useClassNames(classPrefix);

  return (
    <button
      id={id}
      aria-controls={controlId}
      aria-expanded={expanded}
      aria-disabled={disabled}
      className={withClassPrefix(className)}
      disabled={disabled}
      {...rest}
    >
      {children}
      <Icon
        as={caretAs}
        aria-hidden="true"
        className={prefix`icon`}
        rotate={expanded ? 180 : 0}
        data-testid="caret icon"
      />
    </button>
  );
};

export default AccordionButton;
