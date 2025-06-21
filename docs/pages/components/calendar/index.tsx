import React from 'react';
import {
  Calendar,
  Button,
  Tag,
  Badge,
  Toggle,
  VStack,
  HStack,
  Divider,
  List,
  Text,
  SegmentedControl
} from 'rsuite';
import { HolidayUtil, Lunar, Solar } from 'lunar-typescript';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Calendar']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        HolidayUtil,
        Lunar,
        Solar,
        VStack,
        HStack,
        Calendar,
        Button,
        Divider,
        Tag,
        Badge,
        SegmentedControl,
        Toggle,
        Text,
        List
      }}
    />
  );
}
