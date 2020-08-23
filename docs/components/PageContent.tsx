import * as React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Divider, Icon, ButtonGroup, Button, IconButton, Tooltip, Whisper } from 'rsuite';
import { canUseDOM } from 'dom-lib';
import { Markdown } from 'react-markdown-reader';
import AppContext from './AppContext';
import PageContainer from './PageContainer';
import Head from './Head';
import Paragraph from './Paragraph';
import components from '../utils/component.config.json';
import { getTitle, getDescription, replaceWithPlaceholder } from '../utils/parseHTML';

const babelOptions = {
  presets: ['env', 'stage-1', 'react'],
  plugins: ['transform-class-properties']
};

const CustomCodeView = ({ dependencies, source, onLoaded, ...rest }: any) => {
  const { styleLoaded } = React.useContext(AppContext);
  const placeholder = (
    <div
      dangerouslySetInnerHTML={{
        __html: replaceWithPlaceholder(source ?? '')
      }}
    />
  );
  if (canUseDOM && source && styleLoaded) {
    const CodeView = dynamic(
      () =>
        import('./CodeView').then(Component => {
          onLoaded?.();
          return Component;
        }),
      {
        loading: () => placeholder
      }
    );
    return (
      <CodeView
        {...rest}
        source={source}
        theme="dark"
        babelOptions={babelOptions}
        buttonClassName="rs-btn-subtle rs-btn-icon-circle"
        dependencies={{ ...dependencies, Paragraph, Divider }}
      />
    );
  }
  return placeholder;
};

interface TabsProps {
  title: string;
  tabExamples: any[];
  dependencies: any;
}

function Tabs(props: TabsProps) {
  const { tabExamples, title, dependencies } = props;

  if (!tabExamples?.length) {
    return null;
  }

  const [tabIndex, setTabIndex] = React.useState<number>(0);
  const activeExample = tabExamples[tabIndex];

  return (
    <div>
      <h3>{title}</h3>
      <ButtonGroup size="xs" className="menu-tabs">
        {tabExamples.map((item, index: number) => (
          <Button
            key={index}
            appearance={index === tabIndex ? 'primary' : 'default'}
            onClick={() => {
              setTabIndex(index);
            }}
          >
            {item.title}
          </Button>
        ))}
      </ButtonGroup>
      <CustomCodeView key={tabIndex} source={activeExample?.source} dependencies={dependencies} />
    </div>
  );
}

export interface PageContentProps {
  id?: string;
  category?: string;
  examples?: string[];
  dependencies?: any;
  tabExamples?: any[];
  children?: React.ReactNode;
  hidePageNav?: boolean;
}

const ViewCode = ({ source, dependencies, path }) => {
  return (
    <CustomCodeView
      source={source}
      dependencies={dependencies}
      renderToolbar={showCodeButton => {
        return (
          <React.Fragment>
            <Whisper placement="top" speaker={<Tooltip>Show the source</Tooltip>}>
              {showCodeButton}
            </Whisper>{' '}
            <Whisper placement="top" speaker={<Tooltip>See the source on GitHub</Tooltip>}>
              <IconButton
                appearance="subtle"
                icon={<Icon icon="github" />}
                circle
                size="xs"
                target="_blank"
                href={path}
              />
            </Whisper>
          </React.Fragment>
        );
      }}
    />
  );
};

const PageContent = ({
  category = 'components',
  dependencies,
  tabExamples,
  children,
  hidePageNav
}: PageContentProps) => {
  const { messages, localePath } = React.useContext(AppContext);

  const router = useRouter();

  const pathname = router.pathname;
  const id = pathname.match(new RegExp(`\/${category}\/(\\S*)`))?.[1];

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const context = require(`../pages${pathname}${localePath}/index.md`);
  const title = getTitle(context);
  const description = getDescription(context);
  const pageHead = <Head title={title} description={description} />;

  const component = components.find(item => item.id === id || item.name === id);
  const designHash = component?.designHash;

  const fragments = context.split(/<!--{(\S+)}-->/);

  return (
    <PageContainer designHash={designHash} routerId={pathname} hidePageNav={hidePageNav}>
      {pageHead}
      {fragments.map((item, index) => {
        // Import sample code
        const codeName = item.match(/include:`(\S+)`/)?.[1];

        if (codeName) {
          return (
            <ViewCode
              key={index}
              source={require(`../pages${pathname}/fragments/${codeName}`)}
              dependencies={dependencies}
              path={`https://github.com/rsuite/rsuite/tree/master/docs/pages${pathname}/fragments/${codeName}`}
            />
          );
        }

        // Import markdown documents
        const markdownFile = item.match(/include:\((\S+)\)/)?.[1];

        if (markdownFile) {
          return <Markdown key={index}>{require(`../pages/${markdownFile}`)}</Markdown>;
        }

        return <Markdown key={index}>{item}</Markdown>;
      })}

      <Tabs
        title={messages?.common?.advanced}
        tabExamples={tabExamples}
        dependencies={dependencies}
      />

      {children}
    </PageContainer>
  );
};

export default PageContent;
