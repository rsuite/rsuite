import React from 'react';
import {
  Dropdown,
  Button,
  ButtonToolbar,
  IconButton,
  ButtonGroup,
  Popover,
  Whisper,
  Stack,
  Avatar
} from 'rsuite';
import Link from 'next/link';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import PageIcon from '@rsuite/icons/Page';
import FolderFillIcon from '@rsuite/icons/FolderFill';
import DetailIcon from '@rsuite/icons/Detail';
import FileDownloadIcon from '@rsuite/icons/FileDownload';
import ArrowDownIcon from '@rsuite/icons/ArrowDown';
import PlusIcon from '@rsuite/icons/Plus';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Dropdown']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        ArrowDownIcon,
        PlusIcon,
        PageIcon,
        FolderFillIcon,
        DetailIcon,
        FileDownloadIcon,
        Dropdown,
        Button,
        ButtonToolbar,
        IconButton,
        ButtonGroup,
        Popover,
        Whisper,
        Link,
        Stack,
        Avatar
      }}
    />
  );
}
