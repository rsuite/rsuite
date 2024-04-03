import React from 'react';
import { Avatar, AvatarGroup, Badge } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import { FaUserLarge } from 'react-icons/fa6';
import { FcBusinessman, FcCustomerSupport } from 'react-icons/fc';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Avatar', 'AvatarGroup']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ Avatar, AvatarGroup, Badge, FaUserLarge, FcBusinessman, FcCustomerSupport }}
      sandboxDependencies={{ 'react-icons': 'latest' }}
    />
  );
}
