import React, { useCallback } from 'react';
import { Divider, IconButton, Tooltip, Whisper, Placeholder } from 'rsuite';
import canUseDOM from 'dom-lib/canUseDOM';
import toggleClass from 'dom-lib/toggleClass';
import GithubIcon from '@rsuite/icons/legacy/Github';
import { Icon } from '@rsuite/icons';
import stackBlitzSDK, { Project } from '@stackblitz/sdk';

import { TransparentIcon, CodesandboxIcon, StackBlitzIcon } from '../SvgIcons';
import AppContext from '../AppContext';
import Paragraph from '../Paragraph';
import ReactCodeView from './ReactCodeView';
import CodeSandbox from './CodeSandbox';
import { html, css, dependencies as codeDependencies } from './utils';

interface CustomCodeViewProps {
  className?: string;
  height?: number;
  dependencies?: any;
  source?: any;
  path: string;
  renderToolbar?: (showCodeButton: React.ReactNode) => React.ReactNode;
}

const CircleIconButton = React.forwardRef(({ icon, ...rest }: any, ref: React.Ref<any>) => (
  <IconButton
    {...rest}
    ref={ref}
    appearance="subtle"
    circle
    size="xs"
    type="submit"
    icon={<Icon as={icon} />}
  />
));

const CodeView = (props: CustomCodeViewProps) => {
  const { dependencies, source, height = 100, path, ...rest } = props;
  const { styleLoaded, messages } = React.useContext(AppContext);
  const [code, setCode] = React.useState('');
  const viewRef = React.useRef();

  const setRenderCode = useCallback(code => {
    setCode(
      `import React from 'react';\nimport ReactDOM from 'react-dom';\nimport "./styles.css";\n${code}`
    );
  }, []);

  const renderPlaceholder = useCallback(() => {
    return <Placeholder.Graph height={height} />;
  }, [height]);

  const changeTransparent = useCallback(() => {
    toggleClass(viewRef.current, 'rs-code-transparent');
  }, []);

  const openStackBlitz = useCallback(() => {
    const project: Project = {
      title: 'rsuite example',
      description: 'Example from rsuitejs.com',
      template: 'create-react-app',
      dependencies: codeDependencies,
      files: { 'index.js': code, 'index.html': html, 'styles.css': css }
    };

    stackBlitzSDK.openProject(project);
  }, [code]);

  const withWhisper = useCallback(
    ({ children, i18nKey }) => (
      <Whisper
        key={i18nKey}
        placement="top"
        speaker={<Tooltip>{messages.common?.[i18nKey]}</Tooltip>}
      >
        {children}
      </Whisper>
    ),
    [messages.common]
  );

  const tools = [
    { i18nKey: 'showTheSource' },
    {
      children: (
        <CodeSandbox key="codeSandbox" code={code}>
          {withWhisper({
            children: <CircleIconButton icon={CodesandboxIcon} />,
            i18nKey: 'openCodeSandbox'
          })}
        </CodeSandbox>
      )
    },

    {
      icon: <Icon as={StackBlitzIcon} />,
      i18nKey: 'openStackBlitz',
      onClick: openStackBlitz
    },
    {
      icon: <Icon as={TransparentIcon} style={{ fontSize: 15 }} />,
      i18nKey: 'transparentBackground',
      onClick: changeTransparent
    },
    {
      icon: <Icon as={GithubIcon} />,
      i18nKey: 'seeTheSourceOnGitHub',
      href: path,
      target: '_blank'
    }
  ];

  if (canUseDOM && source && styleLoaded) {
    return (
      <div ref={viewRef} className="rs-code-view">
        <ReactCodeView
          {...rest}
          style={{ minHeight: height }}
          dependencies={{ ...dependencies, Paragraph, Divider }}
          beforeCompile={setRenderCode}
          renderToolbar={(CodeButton: React.ReactElement) => {
            return (
              <>
                {tools.map((item, index) => {
                  const { i18nKey, children, ...rest } = item;
                  if (children) {
                    return children;
                  } else if (index === 0) {
                    return withWhisper({ children: CodeButton, i18nKey });
                  }
                  return withWhisper({
                    children: <IconButton appearance="subtle" circle size="xs" {...rest} />,
                    i18nKey
                  });
                })}
              </>
            );
          }}
        >
          {source}
        </ReactCodeView>
      </div>
    );
  }
  return renderPlaceholder();
};

export default CodeView;
