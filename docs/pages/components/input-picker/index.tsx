import React from 'react';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';
import Simulation from '@/components/Simulation';
import { FaUserGroup, FaUser } from 'react-icons/fa6';
import { InputPicker, Button, VStack, HStack, Loader, Box, Text, Divider } from 'rsuite';
import { importFakerString, mockUsers, mockUsersString, sandboxFakerVersion } from '@/utils/mock';
const mockfile = {
  name: 'mock.js',
  content: [importFakerString, mockUsersString].join('\n')
};

const sandboxDependencies = {
  ...sandboxFakerVersion
};

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['InputPicker']} />,
  'example-responsive': () => <Simulation example="responsive" componentName="input-picker" />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      sandboxDependencies={sandboxDependencies}
      sandboxFiles={[mockfile]}
      dependencies={{
        InputPicker,
        Button,
        VStack,
        HStack,
        Loader,
        Box,
        Text,
        Divider,
        mockUsers,
        FaUserGroup,
        FaUser
      }}
    />
  );
}
