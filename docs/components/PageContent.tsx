import * as React from 'react';
import { Markdown } from 'react-markdown-reader';
import { useRouter } from 'next/router';
import PageContainer from './PageContainer';

interface PageContentProps {
  routerId: string;
}

const PageContent = ({ routerId }: PageContentProps) => {
  const router = useRouter();
  const localePath = router.query?.userLanguage === 'en' ? '/en/' : '/';
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const content = require(`../pages/${routerId}${localePath}index.md`);

  return (
    <PageContainer routerId={routerId}>
      <Markdown>{content}</Markdown>
    </PageContainer>
  );
};

export default PageContent;
