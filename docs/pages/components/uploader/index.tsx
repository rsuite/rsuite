import React from 'react';
import { Uploader, Button, Loader, Message, useToaster } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import CameraRetroIcon from '@rsuite/icons/legacy/CameraRetro';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Uploader']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ Uploader, Button, Loader, Message, AvatarIcon, CameraRetroIcon, useToaster }}
    />
  );
}
