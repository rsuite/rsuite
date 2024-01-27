import React from 'react';
import { Stack, Panel, Button, Divider, Input, Radio, RadioGroup, Slider } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Stack']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ Stack, Panel, Button, Divider, Input, Radio, RadioGroup, Slider }}
    />
  );
}
