import React from 'react';
import { AutoComplete, InputGroup, Stack } from 'rsuite';
import DefaultPage from '@/components/Page';
import SearchIcon from '@rsuite/icons/Search';
import MemberIcon from '@rsuite/icons/Member';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['AutoComplete']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ AutoComplete, InputGroup, SearchIcon, MemberIcon, Stack }}
    />
  );
}
