import React from 'react';
import { Avatar, AvatarGroup, Badge } from 'rsuite';
import DefaultPage from '@/components/Page';
import { Avatar as AvatarIcon } from '@/components/SvgIcons';
import User from '@rsuite/icons/legacy/User';
import { Icon } from '@rsuite/icons';

export default function Page() {
  return <DefaultPage dependencies={{ Avatar, AvatarGroup, Badge, AvatarIcon, User, Icon }} />;
}
