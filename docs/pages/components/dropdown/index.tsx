import React from 'react';
import {
  Menu,
  Dropdown,
  Button,
  ButtonToolbar,
  IconButton,
  ButtonGroup,
  Popover,
  Whisper,
  Stack,
  Avatar,
  Box
} from 'rsuite';
import Link from 'next/link';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import PageIcon from '@rsuite/icons/Page';
import IdInfoIcon from '@rsuite/icons/IdInfo';
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
        IdInfoIcon,
        DetailIcon,
        FileDownloadIcon,
        Dropdown,
        Menu,
        Button,
        ButtonToolbar,
        IconButton,
        ButtonGroup,
        Popover,
        Whisper,
        Link,
        Stack,
        Avatar,
        Box
      }}
    />
  );
}
