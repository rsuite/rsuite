import React from 'react';
import classNames from 'classnames';
import Fade from '../../Animation/Fade';
import { mergeRefs } from '@/internals/utils';

interface ModalBackdropOptions {
  transition?: React.ElementType;
  open?: boolean;
  timeout?: number;
  reduceMotion?: boolean;
  style?: React.CSSProperties;
  className?: string;
  setRef: (element: HTMLElement | null) => void;
}

// React development stacks retain the functions that created mounted elements.
// Keep these render functions outside the modal's callback/children scope.
export default function renderModalBackdrop({
  transition,
  open,
  timeout,
  reduceMotion,
  style,
  className,
  setRef
}: ModalBackdropOptions) {
  if (transition) {
    return (
      <Fade transitionAppear in={open} timeout={timeout} reduceMotion={reduceMotion}>
        {(fadeProps, ref) => {
          const { className: transitionClassName, ...rest } = fadeProps;
          return (
            <div
              aria-hidden
              data-testid="backdrop"
              {...rest}
              style={style}
              ref={mergeRefs(setRef, ref)}
              className={classNames(className, transitionClassName)}
            />
          );
        }}
      </Fade>
    );
  }
  return <div aria-hidden style={style} className={className} />;
}
