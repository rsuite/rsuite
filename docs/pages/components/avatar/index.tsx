import * as React from 'react';
import { Avatar, Icon, Badge } from 'rsuite';
import DefaultPage from '@/components/Page';
import { Avatar as AvatarUser } from '@/components/SvgIcons';

export default function Page() {
  return (
    <DefaultPage
      examples={['basic', 'text', 'icon', 'image', 'size', 'badge']}
      dependencies={{ Avatar, Icon, Badge, AvatarUser }}
    />
  );
}
