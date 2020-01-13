import * as React from 'react';
import { Breadcrumb, Icon } from 'rsuite';
import Link from 'next/link';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Breadcrumb"
        examples={['basic', 'separator', 'with-router']}
        dependencies={{ Breadcrumb, Icon, Link }}
      />
    </Frame>
  );
}
