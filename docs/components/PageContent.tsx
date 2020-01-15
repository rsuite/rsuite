import * as React from 'react';
import _ from 'lodash';
import dynamic from 'next/dynamic';
import { Divider, Icon, ButtonGroup, Button, IconButton, Tooltip, Whisper } from 'rsuite';
import { canUseDOM } from 'dom-lib';
import { Markdown } from 'react-markdown-reader';
import AppContext from './AppContext';
import PageContainer from './PageContainer';
import Head from './Head';
import Paragraph from './Paragraph';
import components from '../utils/component.config.json';
import { getTitle, getDescription } from '../utils/parseHTML';

const babelOptions = {
  presets: ['env', 'stage-1', 'react'],
  plugins: ['transform-class-properties']
};

const CustomCodeView = ({ dependencies, ...rest }: any) => {
  if (canUseDOM) {
    const CodeView = dynamic(() => import('./CodeView'));
    return (
      <CodeView
        {...rest}
        theme="dark"
        babelOptions={babelOptions}
        buttonClassName="rs-btn-subtle rs-btn-icon-circle"
        dependencies={{ ...dependencies, Paragraph, Divider }}
      />
    );
  }
  return null;
};

interface TabsProps {
  id: string;
  title: string;
  tabExamples: any[];
  dependencies: any;
}

function Tabs(props: TabsProps) {
  const { tabExamples, id, title, dependencies } = props;

  if (!tabExamples?.length) {
    return null;
  }

  const index = canUseDOM ? parseInt(sessionStorage.getItem(`${id}-tab-index`)) : 0;
  const [tabIndex, setTabIndex] = React.useState<number>(0 + index);
  const { sorce } = tabExamples[tabIndex];

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
              sessionStorage.setItem(`${id}-tab-index`, index + '');
            }}
          >
            {item.title}
          </Button>
        ))}
      </ButtonGroup>
      <CustomCodeView key={tabIndex} source={sorce} dependencies={dependencies} />
    </div>
  );
}

interface PageContentWithExampleProps {
  id?: string;
  category?: string;
  examples?: string[];
  dependencies?: any;
  getDependencies?: any;
  tabExamples?: any[];
  children?: React.ReactNode;
}

const PageContentWithExample = ({
  id,
  category = 'components',
  examples = [],
  getDependencies,
  dependencies,
  tabExamples,
  children
}: PageContentWithExampleProps) => {
  const { messages, language, localePath } = React.useContext(AppContext);

  const pathname = id ? `${category}/${_.kebabCase(id)}` : category;

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const context = require(`../pages/${pathname}${localePath}/index.md`);
  const title = getTitle(context);
  const description = getDescription(context);
  const pageHead = <Head title={title} description={description} />;

  if (!examples?.length) {
    return (
      <PageContainer routerId={`${category}/${id}`}>
        {pageHead}
        <Markdown>{context}</Markdown>
        {children}
      </PageContainer>
    );
  }

  const componentExamples = examples.map(item => ({
    source: require(`../pages/${pathname}${localePath}/${item}.md`),
    path: `https://github.com/rsuite/rsuite/tree/master/docs/pages/${pathname}${localePath}/${item}.md`
  }));

  const extraDependencies = getDependencies ? getDependencies(language) : null;

  if (extraDependencies) {
    dependencies = Object.assign(dependencies, extraDependencies);
  }

  const component = components.find(item => item.id === id || item.name === id);
  const designHash = component?.designHash;
  const routerId = component?.id;

  const docs = context.split('<!--{demo}-->');
  const header = docs[0];
  const footer = docs[1];

  return (
    <PageContainer designHash={designHash} routerId={routerId ? `components/${routerId}` : null}>
      {pageHead}
      <Markdown>{header}</Markdown>
      {componentExamples.map((item, index) => (
        <CustomCodeView
          key={index}
          source={item.source}
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
                    href={item.path}
                  />
                </Whisper>
              </React.Fragment>
            );
          }}
        />
      ))}
      <Tabs
        id={id}
        title={messages?.common?.advanced}
        tabExamples={tabExamples}
        dependencies={dependencies}
      />

      <Markdown>{footer}</Markdown>
      {children}
    </PageContainer>
  );
};

export default PageContentWithExample;
