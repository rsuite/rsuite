/// <reference types="react" />
import { TransitionProps } from './Transition';
import { SlideProps } from './Slide';
import { CollapseProps } from './Collapse';
import { FadeProps } from './Fade';
import { BounceProps } from './Bounce';
export interface AnimationAPI {
    Transition: React.ComponentType<TransitionProps>;
    Collapse: React.ComponentType<CollapseProps>;
    Fade: React.FunctionComponent<FadeProps>;
    Bounce: React.FunctionComponent<BounceProps>;
    Slide: React.FunctionComponent<SlideProps>;
}
declare const Animation: AnimationAPI;
export type { TransitionProps, SlideProps, CollapseProps, FadeProps, BounceProps };
export default Animation;
