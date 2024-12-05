import React from 'react';
import { List, Panel, HStack, VStack, Text, Avatar, RadioGroup, Radio } from 'rsuite';
import DefaultPage from '@/components/Page';
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
        RadioGroup,
        Radio,
        PeoplesIcon,
        LocationIcon,
        EmailIcon,
        GlobalIcon
      }}
    />
  );
}
