import React from 'react';
import { Avatar, AvatarGroup, Badge } from 'rsuite';
import DefaultPage from '@/components/Page';
import UserIcon from '@rsuite/icons/legacy/User';
import { Icon } from '@rsuite/icons';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Avatar', 'AvatarGroup']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ Avatar, AvatarGroup, Badge, UserIcon, Icon }}
    />
  );
}
