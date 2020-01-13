import * as React from 'react';
import { MultiCascader, Button, Icon, Toggle, RadioGroup, Radio } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';
import PreventOverflowContainer from '@/components/PreventOverflowContainer';
import { getProvince } from '@/resources/data';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="MultiCascader"
        examples={[
          'basic',
          'appearance',
          'size',
          'cascade',
          'default-value',
          'controlled',
          'block',
          'placement',
          'custom',
          'disabled',
          'uncheckable',
          'async',
          'container',
          'inline'
        ]}
        dependencies={{
          MultiCascader,
          Button,
          Icon,
          Toggle,
          RadioGroup,
          Radio,
          PreventOverflowContainer
        }}
        getDependencies={getProvince}
      />
    </Frame>
  );
}
