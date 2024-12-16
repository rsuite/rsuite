import React from 'react';
import {
  Stat,
  StatGroup,
  HStack,
  VStack,
  Progress,
  SelectPicker,
  useBreakpointValue
} from 'rsuite';
import PeoplesIcon from '@rsuite/icons/Peoples';
import FunnelStepsIcon from '@rsuite/icons/FunnelSteps';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Stat', 'StatGroup']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        HStack,
        VStack,
        Progress,
        Stat,
        StatGroup,
        SelectPicker,
        PeoplesIcon,
        FunnelStepsIcon,
        useBreakpointValue
      }}
    />
  );
}
