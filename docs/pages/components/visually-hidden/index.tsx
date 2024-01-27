import React from 'react';
import { VisuallyHidden, Button } from 'rsuite';
import { FaUniversalAccess } from 'react-icons/fa';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['VisuallyHidden']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ VisuallyHidden, Button, FaUniversalAccess }}
    />
  );
}
