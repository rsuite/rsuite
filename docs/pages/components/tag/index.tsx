import React from 'react';
import { Tag, TagGroup, IconButton, Input } from 'rsuite';
import DefaultPage from '@/components/Page';
import PlusIcon from '@rsuite/icons/Plus';
import files from './files';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{ Tag, TagGroup, IconButton, Input, PlusIcon }}
      sandboxFiles={files}
    />
  );
}
