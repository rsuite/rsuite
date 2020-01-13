import * as React from 'react';
import { Avatar, Icon, Badge } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';
import AvatarUser from '@/components/icons/AvatarUser';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Avatar"
        examples={['basic', 'text', 'icon', 'image', 'size', 'badge']}
        dependencies={{ Avatar, Icon, Badge, AvatarUser }}
      />
    </Frame>
  );
}
