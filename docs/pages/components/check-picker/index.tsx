import React from 'react';
import { CheckPicker, Button, Checkbox, RadioGroup, Radio, VStack, HStack } from 'rsuite';
import DefaultPage from '@/components/Page';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
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
        SpinnerIcon,
        FaUserGroup,
        FaUser
      }}
    />
  );
}
