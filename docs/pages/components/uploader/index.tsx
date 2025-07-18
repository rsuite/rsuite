import React from 'react';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';
import { Uploader, Button, Loader, Message, useToaster, Box, Divider, VStack } from 'rsuite';
import { RxCamera, RxAvatar } from 'react-icons/rx';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Uploader']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Uploader,
        Button,
        Loader,
        Box,
        Message,
        Divider,
        VStack,
        RxCamera,
        RxAvatar,
        useToaster
      }}
    />
  );
}
