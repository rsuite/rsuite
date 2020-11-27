import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Divider, IconButton, Tooltip, Whisper, Placeholder } from 'rsuite';
import { canUseDOM } from 'dom-lib';
import { Markdown } from 'react-markdown-reader';
import AppContext from './AppContext';
import PageContainer from './PageContainer';
import Head from './Head';
import Paragraph from './Paragraph';
import components from '../utils/component.config.json';
import { getTitle, getDescription } from '../utils/parseHTML';
import scrollIntoView from '../utils/scrollIntoView';
import { CodeViewProps } from './CodeView';
import Github from '@rsuite/icons/legacy/Github';

const babelOptions = {
  presets: ['env', 'stage-1', 'react'],
  plugins: ['transform-class-properties'],
};

interface CustomCodeViewProps {
  height?: number;
  dependencies?: any;
  source?: any;
  onLoaded?: () => void;
  renderToolbar?: (showCodeButton: React.ReactNode) => React.ReactNode;
}

const CustomCodeView = (props: CustomCodeViewProps) => {
  const { dependencies, source, height = 100, onLoaded, ...rest } = props;
  const { styleLoaded } = React.useContext(AppContext);

  const renderPlaceholder = React.useCallback(() => {
    return <Placeholder.Graph height={height} />;
  }, [height]);

  if (canUseDOM && source && styleLoaded) {
    const CodeView: React.ComponentType<CodeViewProps> = dynamic(
      () =>
        import('./CodeView').then((Component) => {
          onLoaded?.();
          return Component;
        }),
      {
        loading: renderPlaceholder,
      }
    );

    return (
      <CodeView
        {...rest}
        style={{ minHeight: height }}
        source={source}
        theme="dark"
        babelOptions={babelOptions}
        buttonClassName="rs-btn-subtle rs-btn-icon-circle"
        dependencies={{ ...dependencies, Paragraph, Divider }}
      />
    );
  }
  return renderPlaceholder();
};

CustomCodeView.propTypes = {
  height: PropTypes.number,
  dependencies: PropTypes.object,
  source: PropTypes.string,
  onLoaded: PropTypes.func,
};

interface ViewCodeProps extends CustomCodeViewProps {
  path: string;
}

const ViewCode = function ViewCode(props: ViewCodeProps) {
  const { path, ...rest } = props;
  return (
    <CustomCodeView
      {...rest}
      renderToolbar={(showCodeButton) => {
        return (
          <React.Fragment>
            <Whisper placement="top" speaker={<Tooltip>Show the source</Tooltip>}>
              {showCodeButton}
            </Whisper>{' '}
            <Whisper placement="top" speaker={<Tooltip>See the source on GitHub</Tooltip>}>
              <IconButton
                appearance="subtle"
                icon={<Github />}
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

export interface PageContentProps {
  id?: string;
  category?: string;
  examples?: string[];
  dependencies?: any;
  tabExamples?: any[];
  children?: React.ReactNode;
  hidePageNav?: boolean;
}

const PageContent = (props: PageContentProps) => {
  const { category = 'components', dependencies, children, hidePageNav } = props;
  const { localePath } = React.useContext(AppContext);

  const router = useRouter();

  const pathname = router.pathname;
  const id = pathname.match(new RegExp(`\/${category}\/(\\S*)`))?.[1];

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const context = require(`../pages${pathname}${localePath}/index.md`);
  const title = getTitle(context);
  const description = getDescription(context);
  const pageHead = <Head title={title} description={description} />;

  const component = components.find((item) => item.id === id || item.name === id);
  const designHash = component?.designHash;

  const fragments = context.split(/<!--{(\S+)}-->/);

  React.useEffect(() => {
    scrollIntoView();
  }, []);

  return (
    <PageContainer designHash={designHash} routerId={pathname} hidePageNav={hidePageNav}>
      {pageHead}
      {fragments.map((item, index) => {
        const result = item.match(/include:`(\S+)`(\|(\d+)\|)?/);
        // Import sample code
        const codeName = result?.[1];
        const height = result?.[3];

        if (codeName) {
          return (
            <ViewCode
              key={index}
              height={height ? parseInt(height) : undefined}
              source={require(`../pages${pathname}/fragments/${codeName}`)}
              dependencies={dependencies}
              path={`https://github.com/rsuite/rsuite/tree/master/docs/pages${pathname}/fragments/${codeName}`}
              onLoaded={() => {
                scrollIntoView();
              }}
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

      {children}
    </PageContainer>
  );
};

export default PageContent;
