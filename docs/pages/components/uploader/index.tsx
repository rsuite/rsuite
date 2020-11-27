import React from 'react';
import { Uploader, Button, Loader, Message } from 'rsuite';
import DefaultPage from '@/components/Page';
import Avatar from '@rsuite/icons/legacy/Avatar';
import CameraRetro from '@rsuite/icons/legacy/CameraRetro';

export default function Page() {
  return <DefaultPage dependencies={{ Uploader, Button, Loader, Message, Avatar, CameraRetro }} />;
}
