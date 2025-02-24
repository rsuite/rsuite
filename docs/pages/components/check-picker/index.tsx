import React from 'react';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import { CheckPicker, Button, Checkbox, RadioGroup, Radio, VStack, HStack, Loader } from 'rsuite';
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
  'import-guide': () => <ImportGuide components={['CheckPicker']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      sandboxDependencies={sandboxDependencies}
      sandboxFiles={[mockfile]}
      dependencies={{
        mockUsers,
        VStack,
        HStack,
        CheckPicker,
        Button,
        Checkbox,
        RadioGroup,
        Radio,
        Loader,
        FaUserGroup,
        FaUser
      }}
    />
  );
}
