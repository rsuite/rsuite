/* eslint-disable @typescript-eslint/no-require-imports */
import React, { useEffect } from 'react';
import Head from './Head';
import PageContainer from './PageContainer';
import components from '@/component.config.json';
import scrollIntoView from '@/utils/scrollIntoView';
import CustomCodeView, { CustomCodeViewProps } from '@/components/CodeView';
import InstallGuide from '@/components/InstallGuide';
import { useRouter } from 'next/router';
import { HTMLRenderer } from '@/components/CodeView/HTMLRenderer';
import { useApp } from '@/hooks/useApp';
import { getTitle, getDescription } from '@/utils/parseHTML';
import { installCarbon, installBadges } from '@/components/scripts';
import type { MenuItem } from '@/hooks/usePages';

const defaultInDocsComponents = {
  'install-guide': InstallGuide
};

export interface PageContentProps extends CustomCodeViewProps {
  id?: string;
  category?: string;
  examples?: string[];
  tabExamples?: any[];
  children?: React.ReactNode;
  hidePageNav?: boolean;
  inDocsComponents?: Record<string, React.ComponentType>;
}

const PageContent = (props: PageContentProps) => {
  const {
    category = 'components',
    dependencies,
    children,
    hidePageNav,
    sandboxFiles,
    sandboxDependencies,
    inDocsComponents = defaultInDocsComponents
  } = props;

  const { localePath } = useApp();
  const router = useRouter();
  const pathname = router.pathname;
  const id = pathname.match(new RegExp(`/${category}/(\\S*)`))?.[1];

  const context = require(`../../pages${pathname}${localePath}/index.md`).default;
  const title = getTitle(context);
  const description = getDescription(context);
  const pageHead = <Head title={title} description={description} />;

  let component: MenuItem;

  components.forEach(group => {
    group.children?.forEach(item => {
      if (item.id === id || item.name === id) {
        component = item;
      }
    });
  });

  const designHash = component?.designHash;
  const fragments = context.split(/<!--{(\S+)}-->/);

  useEffect(() => {
    scrollIntoView();
    installCarbon();

    installBadges({ minVersion: component?.minVersion, componentName: component?.name });
  }, []);

  return (
    <PageContainer designHash={designHash} routerId={pathname} hidePageNav={hidePageNav}>
      {pageHead}

      {fragments.map((item, index) => {
        const result = item.match(/include:`(\S+)`(\|(\d+)\|)?/);

        // Import sample code
        const fileName = result?.[1];
        const height = result?.[3];

        if (fileName) {
          const path =
            'https://github.com/rsuite/rsuite/tree/master/docs/pages' +
            `${pathname}/fragments/${fileName}`;

          return (
            <CustomCodeView
              key={index}
              sandboxFiles={sandboxFiles}
              sandboxDependencies={sandboxDependencies}
              height={height ? parseInt(height) : undefined}
              source={require(`../../pages${pathname}/fragments/${fileName}`)}
              dependencies={dependencies}
              path={path}
            />
          );
        }

        // Import markdown documents
        const markdownFile = item.match(/include:\((\S+)\)/)?.[1];

        if (markdownFile) {
          return (
            <HTMLRenderer key={index}>
              {require(`../../pages/${markdownFile}`)?.default}
            </HTMLRenderer>
          );
        }

        // Render component
        const componentKey = item.match(/include:<([A-Za-z-]+)>/)?.[1];

        if (componentKey) {
          const Component = inDocsComponents[componentKey];

          if (Component) {
            return <Component key={index} />;
          }
        }

        return <HTMLRenderer key={index}>{item}</HTMLRenderer>;
      })}

      {children}
    </PageContainer>
  );
};

export default PageContent;
