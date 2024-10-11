import React from 'react';
import { InputPicker, Button, VStack, HStack } from 'rsuite';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import { FaUserGroup, FaUser } from 'react-icons/fa6';

import { importFakerString, mockUsers, mockUsersString, sandboxFakerVersion } from '@/utils/mock';

const mockfile = {
  name: 'mock.js',
  content: [importFakerString, mockUsersString].join('\n')
};

const sandboxDependencies = {
  ...sandboxFakerVersion
};

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['InputPicker']} />
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
        SpinnerIcon,
        mockUsers,
        FaUserGroup,
        FaUser
      }}
    />
  );
}
