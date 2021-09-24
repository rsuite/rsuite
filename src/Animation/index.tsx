import Transition, { TransitionProps } from './Transition';
import Slide, { SlideProps } from './Slide';
import Collapse, { CollapseProps } from './Collapse';
import Fade, { FadeProps } from './Fade';
import Bounce, { BounceProps } from './Bounce';

export interface AnimationAPI {
  Transition: React.ComponentType<TransitionProps>;
  Collapse: React.ComponentType<CollapseProps>;
  Fade: React.FunctionComponent<FadeProps>;
  Bounce: React.FunctionComponent<BounceProps>;
  Slide: React.FunctionComponent<SlideProps>;
}

const Animation: AnimationAPI = {
  Transition,
  Collapse,
  Fade,
  Bounce,
  Slide
};

export type { TransitionProps, SlideProps, CollapseProps, FadeProps, BounceProps };
export default Animation;
