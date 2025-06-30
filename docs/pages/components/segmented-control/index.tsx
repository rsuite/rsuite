import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { SegmentedControl, HStack, VStack, Text, Divider } from 'rsuite';
import { BsViewList, BsCalendar, BsCalendar3 } from 'react-icons/bs';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['SegmentedControl']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        SegmentedControl,
        HStack,
        VStack,
        Text,
        Divider,
        BsViewList,
        BsCalendar,
        BsCalendar3
      }}
    />
  );
}
