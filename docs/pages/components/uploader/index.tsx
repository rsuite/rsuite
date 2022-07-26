import React from 'react';
import { Uploader, Button, Loader, Message, useToaster } from 'rsuite';
import DefaultPage from '@/components/Page';
import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import CameraRetroIcon from '@rsuite/icons/legacy/CameraRetro';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{ Uploader, Button, Loader, Message, AvatarIcon, CameraRetroIcon, useToaster }}
    />
  );
}
