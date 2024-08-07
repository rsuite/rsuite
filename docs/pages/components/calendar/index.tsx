import React from 'react';
import {
  Calendar,
  Button,
  Tag,
  Popover,
  Whisper,
  Badge,
  RadioGroup,
  Radio,
  Toggle,
  VStack,
  HStack,
  Divider,
  Text
} from 'rsuite';
import { HolidayUtil, Lunar, Solar } from 'lunar-typescript';
import DefaultPage from '@/components/Page';
import files from './files';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Calendar']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      examples={['basic', 'compact']}
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
        Popover,
        Whisper,
        Badge,
        RadioGroup,
        Radio,
        Toggle,
        Text
      }}
      sandboxFiles={files}
    />
  );
}
