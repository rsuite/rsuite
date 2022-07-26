import React from 'react';
import { Avatar, AvatarGroup, Badge } from 'rsuite';
import DefaultPage from '@/components/Page';
import UserIcon from '@rsuite/icons/legacy/User';
import { Icon } from '@rsuite/icons';

export default function Page() {
  return <DefaultPage dependencies={{ Avatar, AvatarGroup, Badge, UserIcon, Icon }} />;
}
