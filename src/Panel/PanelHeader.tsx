import React, { isValidElement, cloneElement } from 'react';
import get from 'lodash/get';
import AccordionButton from './AccordionButton';
import Box, { BoxProps } from '@/internals/Box';
import { useStyles } from '@/internals/hooks';

export interface PanelHeaderProps
  extends BoxProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  caretAs?: React.ElementType;
  collapsible?: boolean;
  disabled?: boolean;
  expanded?: boolean;
  role?: string;
  bodyId?: string;
  buttonId?: string;
  onClickButton?: (event: React.MouseEvent) => void;
}

const PanelHeader = (props: PanelHeaderProps) => {
  const {
    as = 'div',
    classPrefix = 'panel',
    className,
    children,
    collapsible,
    caretAs,
    disabled,
    expanded,
    role,
    bodyId,
    buttonId,
    onClickButton,
    ...rest
  } = props;

  const { merge, prefix } = useStyles(classPrefix);

  let headerElement: React.ReactNode;

  if (!isValidElement(children) || Array.isArray(children)) {
    headerElement = <span className={prefix('title')}>{children}</span>;
  } else {
    const className = merge(prefix('title'), get(children, 'props.className'));
    headerElement = cloneElement<any>(children, { className });
  }

  return (
    <Box as={as} className={merge(className, prefix('header'))} {...rest}>
      {collapsible ? (
        <AccordionButton
          id={buttonId}
          role={role}
          caretAs={caretAs}
          controlId={bodyId}
          disabled={disabled}
          expanded={expanded}
          onClick={onClickButton}
        >
          {headerElement}
        </AccordionButton>
      ) : (
        headerElement
      )}
    </Box>
  );
};

export default PanelHeader;
