import React from 'react';
import { Tabs, Placeholder } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import { FaRegSquare, FaImage, FaRegCircle } from 'react-icons/fa';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Tabs']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Tabs,
        Placeholder,
        FaRegSquare,
        FaImage,
        FaRegCircle
      }}
    />
  );
}
