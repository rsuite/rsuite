import React from 'react';
import Transition, { TransitionProps } from './Transition';
import { useClassNames } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';

export interface SlideProps extends TransitionProps {
  placement?: 'top' | 'right' | 'bottom' | 'left';
}

/**
 * Slide animation component
 * @see https://rsuitejs.com/components/animation/#slide
 */
const Slide = React.forwardRef(
  ({ timeout = 300, placement = 'right', ...props }: SlideProps, ref: React.Ref<any>) => {
    const { propsWithDefaults } = useCustom('Slide', props);
    const { prefix } = useClassNames('anim');
    const enterClassName = prefix('slide-in', placement);
    const exitClassName = prefix('slide-out', placement);

    return (
      <Transition
        {...propsWithDefaults}
        ref={ref}
        animation
        timeout={timeout}
        enteringClassName={enterClassName}
        enteredClassName={enterClassName}
        exitingClassName={exitClassName}
        exitedClassName={exitClassName}
      />
    );
  }
);

Slide.displayName = 'Slide';

export default Slide;
