import React from 'react';
import { Button, Toggle } from 'rsuite';
import DefaultPage from '@/components/Page';
import Check from '@rsuite/icons/Check';
import Close from '@rsuite/icons/Close';

export default function Page() {
  return <DefaultPage dependencies={{ Button, Toggle, Icon, Check, Close }} />;
}
