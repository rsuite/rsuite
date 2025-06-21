import React from 'react';
import { List, Panel, HStack, VStack, Text, Avatar, SegmentedControl } from 'rsuite';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';
import PeoplesIcon from '@rsuite/icons/Peoples';
import LocationIcon from '@rsuite/icons/Location';
import EmailIcon from '@rsuite/icons/Email';
import GlobalIcon from '@rsuite/icons/Global';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['List']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Panel,
        List,
        VStack,
        HStack,
        Text,
        Avatar,
        SegmentedControl,
        PeoplesIcon,
        LocationIcon,
        EmailIcon,
        GlobalIcon
      }}
    />
  );
}
