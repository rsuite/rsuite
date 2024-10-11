import React from 'react';
import { SelectPicker, Button, RadioGroup, Radio, Loader, VStack, HStack } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
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
  'import-guide': () => <ImportGuide components={['SelectPicker']} />
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
        SpinnerIcon,
        RadioGroup,
        Radio,
        VStack,
        HStack,
        FaUserGroup,
        FaUser
      }}
    />
  );
}
