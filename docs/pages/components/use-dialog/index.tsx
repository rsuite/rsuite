import React from 'react';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useDialog, Button, Modal, Input, Textarea, VStack } from 'rsuite';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['useDialog']} hasCssComponents={[]} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        useDialog,
        Button,
        Modal,
        Input,
        Textarea,
        VStack
      }}
    />
  );
}
