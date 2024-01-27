import React from 'react';
import { Breadcrumb } from 'rsuite';
import Link from 'next/link';
import DefaultPage from '@/components/Page';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Breadcrumb']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ Breadcrumb, Link, AngleRightIcon }}
    />
  );
}
