import React from 'react';
import { Form, Button, Checkbox, CheckboxGroup } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Checkbox', 'CheckboxGroup']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ Form, Button, Checkbox, CheckboxGroup }}
    />
  );
}
