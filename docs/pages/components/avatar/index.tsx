import React from 'react';
import { Avatar, Badge } from 'rsuite';
import DefaultPage from '@/components/Page';
import { Avatar as AvatarUser } from '@/components/SvgIcons';
import User from '@rsuite/icons/legacy/User';

export default function Page() {
  return <DefaultPage dependencies={{ Avatar, Badge, AvatarUser, User }} />;
}
