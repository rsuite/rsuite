import React from 'react';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import { Badge, Button, Toggle, Avatar, HStack, Text, IconButton } from 'rsuite';
import { MdCheck, MdNotifications, MdError } from 'react-icons/md';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Badge']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Avatar,
        Badge,
        Button,
        Toggle,
        HStack,
        Text,
        IconButton,
        MdCheck,
        MdNotifications,
        MdError
      }}
    />
  );
}
