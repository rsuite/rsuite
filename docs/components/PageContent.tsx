import React from 'react';

import { useRouter } from 'next/router';
import { Divider, Footer } from 'rsuite';
import { MarkdownRenderer } from 'react-code-view';
import AppContext from './AppContext';
import PageContainer from './PageContainer';
import Head from './Head';
import components from '../utils/component.config.json';
import { getTitle, getDescription } from '../utils/parseHTML';
import scrollIntoView from '../utils/scrollIntoView';
import { VercelBanner } from './VercelBanner';
import CustomCodeView, { CustomCodeViewProps } from './CodeView';

export interface PageContentProps extends CustomCodeViewProps {
  id?: string;
  category?: string;
  examples?: string[];
  tabExamples?: any[];
  children?: React.ReactNode;
  hidePageNav?: boolean;
}

const PageContent = (props: PageContentProps) => {
  const {
    category = 'components',
    dependencies,
    children,
    hidePageNav,
    sandboxFiles,
    sandboxDependencies
  } = props;
  const { localePath } = React.useContext(AppContext);

  const router = useRouter();

  const pathname = router.pathname;
  const id = pathname.match(new RegExp(`\/${category}\/(\\S*)`))?.[1];

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const context = require(`../pages${pathname}${localePath}/index.md`).default;
  const title = getTitle(context);
  const description = getDescription(context);
  const pageHead = <Head title={title} description={description} />;

  const component = components.find(item => item.id === id || item.name === id);
  const designHash = component?.designHash;

  const fragments = context.split(/<!--{(\S+)}-->/);

  React.useEffect(() => {
    scrollIntoView();
  }, []);

  return (
    <PageContainer designHash={designHash} routerId={pathname} hidePageNav={hidePageNav}>
      {pageHead}
      {fragments.map((item, index) => {
        const extResult = item.match(/include:\<(\S+)\>(\|(\d+)\|)?/);
        const extSource = extResult?.[1];

        const result = item.match(/include:`(\S+)`(\|(\d+)\|)?/);

        // Import sample code
        const fileName = result?.[1];
        const height = result?.[3];

        if (fileName || extSource) {
          const source = extSource
            ? require(`../pages/${extSource}`)
            : require(`../pages${pathname}/fragments/${fileName}`);

          const path =
            'https://github.com/rsuite/rsuite/tree/master/docs/pages' +
            (extSource ? `/${extSource}` : `${pathname}/fragments/${fileName}`);

          return (
            <CustomCodeView
              key={index}
              sandboxFiles={sandboxFiles}
              sandboxDependencies={sandboxDependencies}
              height={height ? parseInt(height) : undefined}
              source={source}
              dependencies={dependencies}
              path={path}
            />
          );
        }

        // Import markdown documents
        const markdownFile = item.match(/include:\((\S+)\)/)?.[1];

        if (markdownFile) {
          return (
            <MarkdownRenderer key={index}>
              {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                require(`../pages/${markdownFile}`)?.default
              }
            </MarkdownRenderer>
          );
        }

        return <MarkdownRenderer key={index}>{item}</MarkdownRenderer>;
      })}

      {children}

      <Divider />
      <Footer>
        <VercelBanner />
      </Footer>
    </PageContainer>
  );
};

export default PageContent;
