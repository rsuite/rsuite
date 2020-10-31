import React from 'react';
import { Badge, Button, Toggle, Icon, Rate } from 'rsuite';
import DefaultPage from '@/components/Page';
import * as SvgIcons from '@/components/SvgIcons';

export default function Page() {
  return <DefaultPage dependencies={{ Badge, Button, Toggle, Rate, Icon, SvgIcons }} />;
}
