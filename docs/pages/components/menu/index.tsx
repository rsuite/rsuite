import React from 'react';
import {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Menu
} from 'rsuite';
import Link from 'next/link';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import PageIcon from '@rsuite/icons/Page';
import IdInfoIcon from '@rsuite/icons/IdInfo';
import DetailIcon from '@rsuite/icons/Detail';
import FileDownloadIcon from '@rsuite/icons/FileDownload';

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
        Menu,
        Link
      }}
    />
  );
}
