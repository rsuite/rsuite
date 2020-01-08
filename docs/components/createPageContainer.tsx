import * as React from 'react';
import { Markdown } from 'react-markdown-reader';
import PageContainer from './PageContainer';

const createPageContainer = ({ routerId }) => {
  return locale => {
    const localePath = locale === 'en' ? '/en/' : '/';
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const content = require(`../pages/${routerId}${localePath}index.md`);

    const PageContainerWithContent = () => (
      <PageContainer routerId={routerId}>
        <Markdown>{content}</Markdown>
      </PageContainer>
    );

    return PageContainerWithContent;
  };
};

export default createPageContainer;
