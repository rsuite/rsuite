import React from 'react';
import {
  Stat,
  StatGroup,
  HStack,
  VStack,
  Progress,
  ProgressCircle,
  SelectPicker,
  useBreakpointValue
} from 'rsuite';
import PeoplesIcon from '@rsuite/icons/Peoples';
import FunnelStepsIcon from '@rsuite/icons/FunnelSteps';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';
import Simulation from '@/components/Simulation';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Stat', 'StatGroup']} />,
  'example-responsive': () => <Simulation example="responsive" componentName="stat" />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        HStack,
        VStack,
        Progress,
        ProgressCircle,
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
