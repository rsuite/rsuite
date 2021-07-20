import React from 'react';
import { Tag, TagGroup, IconButton, Input } from 'rsuite';
import DefaultPage from '@/components/Page';
import Plus from '@rsuite/icons/Plus';

export default function Page() {
  return <DefaultPage dependencies={{ Tag, TagGroup, IconButton, Input, Plus }} />;
}
