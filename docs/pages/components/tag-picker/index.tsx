import React from 'react';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import { TagPicker, Button, Tag, Checkbox, VStack, HStack, Loader, Box } from 'rsuite';
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
  'import-guide': () => <ImportGuide components={['TagPicker']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      sandboxDependencies={sandboxDependencies}
      sandboxFiles={[mockfile]}
      dependencies={{
        mockUsers,
        Checkbox,
        Tag,
        TagPicker,
        Button,
        VStack,
        HStack,
        Loader,
        Box,
        FaUserGroup,
        FaUser
      }}
    />
  );
}
