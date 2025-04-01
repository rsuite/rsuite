import React from 'react';
import PageContent, { PageContentProps } from './PageContent';
import Frame, { FrameProps } from './Frame';

export default function Page(props: PageContentProps & FrameProps) {
  const { submenu, ...rest } = props;
  return (
    <Frame submenu={submenu}>
      <PageContent {...rest} />
    </Frame>
  );
}
