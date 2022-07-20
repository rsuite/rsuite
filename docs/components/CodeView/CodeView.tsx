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
  files: { name: string; content: string }[];
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
  const { dependencies, source, height = 100, path, files, ...rest } = props;
  const { styleLoaded, messages } = React.useContext(AppContext);
  const [code, setCode] = React.useState('');
  const viewRef = React.useRef();

  const setRenderCode = useCallback(
    code => {
      const deps = [
        `import React from 'react';`,
        `import ReactDOM from 'react-dom';`,
        `import './styles.css';`,
        ...files?.map(file => `import './${file.name}';`)
      ];

      setCode(`${deps.join('\n')}\n${code}`);
    },
    [files]
  );

  const renderPlaceholder = useCallback(() => {
    return <Placeholder.Graph height={height} />;
  }, [height]);

  const changeTransparent = useCallback(() => {
    toggleClass(viewRef.current, 'rs-code-transparent');
  }, []);

  const openStackBlitz = useCallback(() => {
    const depsFiles = {};

    files?.forEach(file => {
      depsFiles[file.name] = file.content;
    });

    const project: Project = {
      title: 'rsuite example',
      description: 'Example from rsuitejs.com',
      template: 'create-react-app',
      dependencies: codeDependencies,
      files: { 'index.js': code, 'index.html': html, 'styles.css': css, ...depsFiles }
    };

    stackBlitzSDK.openProject(project);
  }, [code, files]);

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
        <CodeSandbox key="codeSandbox" code={code} files={files}>
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

  const renderToolbar = (showCodeButton: React.ReactElement) => {
    return (
      <>
        {tools.map((item, index) => {
          const { i18nKey, children, ...rest } = item;

          // Wait for code to import before showing CodeSandbox and StackBlitz buttons
          if ((index === 1 || index === 2) && !code) {
            return null;
          }

          if (children) {
            return children;
          } else if (index === 0) {
            return withWhisper({ children: showCodeButton, i18nKey });
          }
          return withWhisper({
            children: <IconButton appearance="subtle" circle size="xs" {...rest} />,
            i18nKey
          });
        })}
      </>
    );
  };

  if (canUseDOM && source && styleLoaded) {
    return (
      <ReactCodeView
        {...rest}
        ref={viewRef}
        style={{ minHeight: height }}
        dependencies={{ ...dependencies, Paragraph, Divider }}
        beforeCompile={setRenderCode}
        renderToolbar={renderToolbar}
      >
        {source}
      </ReactCodeView>
    );
  }
  return renderPlaceholder();
};

export default CodeView;
