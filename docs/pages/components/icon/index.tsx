import * as React from 'react';
import { Icon, IconStack, Button, IconButton } from 'rsuite';
import DefaultPage from '@/components/Page';
import { IconLogo } from '@/components/SvgIcons';
import * as SvgIcons from '@/components/SvgIcons';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Icon,
        IconStack,
        Button,
        IconButton,
        SvgIcons,
        IconLogo
      }}
    />
  );
}
