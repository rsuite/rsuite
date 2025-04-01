import React from 'react';
import Link from 'next/link';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';
import PageIcon from '@rsuite/icons/Page';
import IdInfoIcon from '@rsuite/icons/IdInfo';
import DetailIcon from '@rsuite/icons/Detail';
import FileDownloadIcon from '@rsuite/icons/FileDownload';
import { Menu, Popover, Whisper, Button } from 'rsuite';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Menu']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        PageIcon,
        IdInfoIcon,
        DetailIcon,
        FileDownloadIcon,
        Button,
        Menu,
        Popover,
        Whisper,
        Link
      }}
    />
  );
}
