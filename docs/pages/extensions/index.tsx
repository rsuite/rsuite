import * as React from 'react';
import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame openSubmenu={false}>
      <PageContent category="extensions" />
    </Frame>
  );
}
