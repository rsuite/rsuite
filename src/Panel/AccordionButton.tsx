import React from 'react';
import Icon from '@rsuite/icons/Icon';
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine';
import { useClassNames } from '@/internals/hooks';

export interface AccordionButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
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
    caretAs = ArrowDownLineIcon,
    ...rest
  } = props;
  const { prefix, withClassPrefix } = useClassNames(classPrefix);

  return (
    <button
      id={id}
      type="button"
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
