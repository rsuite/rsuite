import React from 'react';
import { Animation, Button, ButtonToolbar, Card, HStack, VStack, Text } from 'rsuite';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Animation']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ Button, ButtonToolbar, Animation, Card, HStack, VStack, Text }}
    />
  );
}
