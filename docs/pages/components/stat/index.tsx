import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Stat, HStack, Progress } from 'rsuite';
import PeoplesIcon from '@rsuite/icons/Peoples';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Stat']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        HStack,
        Progress,
        Stat,
        PeoplesIcon
      }}
    />
  );
}
