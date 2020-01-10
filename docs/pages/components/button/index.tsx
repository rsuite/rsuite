import * as React from 'react';
import { Button, IconButton, ButtonGroup, ButtonToolbar, Panel, Icon } from 'rsuite';

import PageContentWithExample from '../../../components/PageContentWithExample';
import Frame from '../../../components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContentWithExample
        id="Button"
        examples={[
          'basic',
          'appearance',
          'size',
          'color',
          'custom',
          'icon-button',
          'block',
          'disabled',
          'active',
          'loading',
          'group-basic',
          'vertical',
          'toolbar',
          'justified'
        ]}
        dependencies={{
          Button,
          IconButton,
          ButtonGroup,
          ButtonToolbar,
          Icon,
          Panel
        }}
      />
    </Frame>
  );
}
