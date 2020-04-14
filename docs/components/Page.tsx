import * as React from 'react';
import PageContent, { PageContentProps } from '@/components/PageContent';
import Frame, { FrameProps } from '@/components/Frame';

export default function Page(props: PageContentProps & FrameProps) {
  const { submenu, ...rest } = props;
  return (
    <Frame submenu={submenu}>
      <PageContent {...rest} />
    </Frame>
  );
}
