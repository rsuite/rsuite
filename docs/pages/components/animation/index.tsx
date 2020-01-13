import * as React from 'react';
import { Animation, Button, ButtonToolbar } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';
import { AnimationAPI, TransitionProps } from 'rsuite/lib/Animation';

const { Fade, Collapse, Bounce, Slide, Transition } = Animation as AnimationAPI & {
  Bounce: React.FunctionComponent<TransitionProps>;
  Slide: React.FunctionComponent<TransitionProps>;
};

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="animation"
        examples={['fade', 'collapse', 'bounce', 'slide', 'transition']}
        dependencies={{ Button, ButtonToolbar, Fade, Collapse, Bounce, Slide, Transition }}
      />
    </Frame>
  );
}
