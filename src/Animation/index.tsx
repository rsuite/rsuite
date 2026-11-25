import { ComponentType, FunctionComponent } from 'react';
import Transition, { TransitionProps } from './Transition';
import Slide, { SlideProps } from './Slide';
import Collapse, { CollapseProps } from './Collapse';
import Fade, { FadeProps } from './Fade';
import Bounce, { BounceProps } from './Bounce';

// export types
export type { TransitionProps, SlideProps, CollapseProps, FadeProps, BounceProps };

export interface AnimationAPI {
  Transition: ComponentType<TransitionProps>;
  Collapse: ComponentType<CollapseProps>;
  Fade: FunctionComponent<FadeProps>;
  Bounce: FunctionComponent<BounceProps>;
  Slide: FunctionComponent<SlideProps>;
}

// export components
export const Animation: AnimationAPI = {
  Transition,
  Collapse,
  Fade,
  Bounce,
  Slide
};

export { Transition, Slide, Collapse, Fade, Bounce };
export default Animation;
