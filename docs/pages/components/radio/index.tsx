import React from 'react';
import { Form, RadioGroup, Button, Radio } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Radio', 'RadioGroup']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ Form, RadioGroup, Button, Radio }}
    />
  );
}
