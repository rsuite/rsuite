import React from 'react';
import DefaultPage from '@/components/Page';
import { Table, SelectPicker, CheckPicker, Loader } from 'rsuite';
import { faker } from '@faker-js/faker/locale/en';
import { importFakerString, mockUsers, mockUsersString, sandboxFakerVersion } from '@/utils/mock';

const mockfile = {
  name: 'mock.js',
  content: [importFakerString, mockUsersString].join('\n')
};

const sandboxDependencies = {
  ...sandboxFakerVersion
};

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        faker,
        mockUsers,
        SelectPicker,
        CheckPicker,
        Table,
        Loader
      }}
      sandboxDependencies={sandboxDependencies}
      sandboxFiles={[mockfile]}
    />
  );
}
