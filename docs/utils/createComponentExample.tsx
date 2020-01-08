import * as React from 'react';
import _ from 'lodash';
import { Divider, Icon, ButtonGroup, Button, IconButton, Tooltip, Whisper } from 'rsuite';

import PageContainer from '../components/PageContainer';
import Paragraph from '../components/Paragraph';
import MarkdownView from '../components/MarkdownView';
import CodeView from '../components/CodeView';
import components from '../component.config.json';
import { getDict } from '../locales';

const babelOptions = {
  presets: ['env', 'stage-1', 'react'],
  plugins: ['transform-class-properties']
};

const CustomCodeView = ({ dependencies, ...rest }) => (
  <CodeView
    {...rest}
    theme="dark"
    babelOptions={babelOptions}
    buttonClassName="rs-btn-subtle rs-btn-icon-circle"
    dependencies={{ ...dependencies, Paragraph, Divider }}
  />
);

const createComponentExample = ({
  id,
  category = 'components',
  examples = [],
  getDependencies,
  dependencies
}) => {
  return locale => {
    const name = _.kebabCase(id);
    const dist = getDict(locale);
    const namePath = locale === 'en' ? `${name}/en/` : `${name}/`;
    const context = require(`@/pages/${category}/${namePath}index.md`);
    const componentExamples = examples.map(item => ({
      source: require(`@/pages/${category}/${namePath}${item}.md`),
      path: `https://github.com/rsuite/rsuite.github.io/tree/master/src/pages/${category}/${namePath}${item}.md`
    }));

    const extraDependencies = getDependencies ? getDependencies(locale) : null;

    if (extraDependencies) {
      dependencies = Object.assign(dependencies, extraDependencies);
    }

    class ComponentExample extends React.Component {
      static defaultProps = {
        tabExamples: []
      };

      constructor(props) {
        super(props);
        const component = components.find(item => item.id === id || item.name === id);
        const tabIndex = sessionStorage.getItem(`${id}-tab-index`);
        this.state = {
          tabIndex: tabIndex ? +tabIndex : 0,
          designHash: _.get(component, 'designHash'),
          routerId: _.get(component, 'id')
        };
      }

      renderExampleByTabIndex() {
        const { tabExamples } = this.props;
        const { tabIndex } = this.state;

        if (!tabExamples.length) {
          return null;
        }

        const { sorce } = tabExamples[tabIndex];

        return <CustomCodeView key={tabIndex} source={sorce} dependencies={dependencies} />;
      }

      renderTabs() {
        const { tabExamples } = this.props;
        const { tabIndex } = this.state;

        if (!tabExamples.length) {
          return null;
        }
        return (
          <div>
            <h3>{dist.common.advanced} </h3>

            <ButtonGroup size="xs" className="menu-tabs">
              {tabExamples.map((item, index) => (
                <Button
                  key={index}
                  appearance={index === tabIndex ? 'primary' : 'default'}
                  onClick={() => {
                    this.setState({ tabIndex: index });
                    sessionStorage.setItem(`${id}-tab-index`, index);
                  }}
                >
                  {item.title}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        );
      }
      render() {
        const { children } = this.props;

        const { designHash, routerId } = this.state;
        const docs = context.split('<!--{demo}-->');
        const header = docs[0];
        const footer = docs[1];

        return (
          <PageContainer
            designHash={designHash}
            routerId={routerId ? `components/${routerId}` : null}
          >
            <MarkdownView>{header}</MarkdownView>
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
                      <Whisper
                        placement="top"
                        speaker={<Tooltip>See the source on GitHub</Tooltip>}
                      >
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
            {this.renderTabs()}
            {this.renderExampleByTabIndex()}
            <MarkdownView>{footer}</MarkdownView>
            {children}
          </PageContainer>
        );
      }
    }

    return ComponentExample;
  };
};

export default createComponentExample;
