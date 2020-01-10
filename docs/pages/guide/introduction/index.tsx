import * as React from 'react';
import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent category="guide" id="introduction" />
    </Frame>
  );
}
