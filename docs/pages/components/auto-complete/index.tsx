import React from 'react';
import { AutoComplete, InputGroup } from 'rsuite';
import DefaultPage from '@/components/Page';
import SearchIcon from '@rsuite/icons/Search';
import MemberIcon from '@rsuite/icons/Member';

export default function Page() {
  return <DefaultPage dependencies={{ AutoComplete, InputGroup, SearchIcon, MemberIcon }} />;
}
