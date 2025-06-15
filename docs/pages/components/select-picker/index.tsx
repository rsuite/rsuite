import React from 'react';
import DefaultPage from '@/components/layout/Page';
import Simulation from '@/components/Simulation';
import ImportGuide from '@/components/ImportGuide';
import PlacementContainer from '@/components/PlacementContainer';
import {
  SelectPicker,
  Button,
  RadioGroup,
  Radio,
  Loader,
  VStack,
  HStack,
  Box,
  Text,
  Divider
} from 'rsuite';
import { importFakerString, mockUsers, mockUsersString, sandboxFakerVersion } from '@/utils/mock';
import { FaUserGroup, FaUser } from 'react-icons/fa6';

const mockfile = {
  name: 'mock.js',
  content: [importFakerString, mockUsersString].join('\n')
};

const sandboxDependencies = {
  ...sandboxFakerVersion
};

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['SelectPicker']} />,
  'example-responsive': () => <Simulation example="responsive" componentName="select-picker" />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      sandboxDependencies={sandboxDependencies}
      sandboxFiles={[mockfile]}
      dependencies={{
        mockUsers,
        Loader,
        SelectPicker,
        Button,
        RadioGroup,
        Radio,
        VStack,
        HStack,
        Box,
        Text,
        Divider,
        PlacementContainer,
        FaUserGroup,
        FaUser
      }}
    />
  );
}
