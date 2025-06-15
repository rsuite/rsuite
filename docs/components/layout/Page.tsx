import React from 'react';
import PageContent, { PageContentProps } from './PageContent';
import Frame, { FrameProps } from './Frame';
import { PageFooter } from './PageFooter';

export default function Page(props: PageContentProps & FrameProps) {
  const { submenu, ...rest } = props;
  return (
    <Frame submenu={submenu}>
      <PageContent {...rest} />
      <PageFooter />
    </Frame>
  );
}
