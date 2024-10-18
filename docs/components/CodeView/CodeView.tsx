import React, { useCallback, useMemo, useState, useRef } from 'react';
import { Divider, IconButton, Tooltip, Whisper, Placeholder } from 'rsuite';
import classNames from 'classnames';
import canUseDOM from 'dom-lib/canUseDOM';
import toggleClass from 'dom-lib/toggleClass';
import GithubIcon from '@rsuite/icons/legacy/Github';
import Icon from '@rsuite/icons/Icon';
import stackBlitzSDK, { Project } from '@stackblitz/sdk';

import { TransparentIcon, CodesandboxIcon, StackBlitzIcon } from '../SvgIcons';
import { useApp } from '../AppContext';
import Paragraph from '../Paragraph';
import ReactCodeView from './ReactCodeView';
import CodeSandbox from './CodeSandbox';
import AdCarbonInline from '../AdCarbon/AdCarbonInline';
import { html, css, dependencies as codeDependencies } from './utils';

export interface CustomCodeViewProps {
  className?: string;
  height?: number;
  dependencies?: any;
  source?: any;
  path?: string;
  sandboxFiles?: { name: string; content: string; import?: boolean }[];
  sandboxDependencies?: any;
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
  const {
    dependencies,
    source,
    height = 100,
    path,
    sandboxFiles,
    sandboxDependencies,
    ...rest
  } = props;
  const { styleLoaded, locales } = useApp();
  const [code, setCode] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const viewRef = useRef();

  const setRenderCode = useCallback(
    code => {
      let deps = [
        `import React from 'react';`,
        `import ReactDOM from 'react-dom';`,
        `import './styles.css';`
      ];

      if (sandboxFiles) {
        deps = deps.concat(
          sandboxFiles
            .map(file => (file.import ? `import './${file.name}';` : null))
            .filter(Boolean)
        );
      }

      setCode(`${deps.join('\n')}\n${code}`);
    },
    [sandboxFiles]
  );

  const renderPlaceholder = useCallback(() => {
    return <Placeholder.Graph height={height} />;
  }, [height]);

  const changeTransparent = useCallback(() => {
    toggleClass(viewRef.current, 'rs-code-transparent');
  }, []);

  const openStackBlitz = useCallback(() => {
    const depsFiles = {};

    sandboxFiles?.forEach(file => {
      depsFiles[file.name] = file.content;
    });

    const project: Project = {
      title: 'rsuite example',
      description: 'Example from rsuitejs.com',
      template: 'create-react-app',
      dependencies: { ...codeDependencies, ...sandboxDependencies },
      files: { 'index.js': code, 'index.html': html, 'styles.css': css, ...depsFiles }
    };

    stackBlitzSDK.openProject(project);
  }, [code, sandboxFiles, sandboxDependencies]);

  const withWhisper = useCallback(
    ({ children, i18nKey }) => (
      <Whisper
        key={i18nKey}
        placement="top"
        speaker={<Tooltip>{locales.common?.[i18nKey]}</Tooltip>}
      >
        {children}
      </Whisper>
    ),
    [locales.common]
  );

  const tools = useMemo(
    () => [
      { i18nKey: 'showTheSource' },
      {
        children: (
          <CodeSandbox
            key="codeSandbox"
            code={code}
            sandboxFiles={sandboxFiles}
            sandboxDependencies={sandboxDependencies}
          >
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
    ],
    [changeTransparent, code, openStackBlitz, path, sandboxDependencies, sandboxFiles, withWhisper]
  );

  const renderToolbar = useCallback(
    (showCodeButton: React.ReactElement) => {
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
    },
    [code, tools, withWhisper]
  );

  const deps = useMemo(() => ({ ...dependencies, Paragraph, Divider }), []);

  if (canUseDOM && source && styleLoaded) {
    return (
      <ReactCodeView
        {...rest}
        ref={viewRef}
        style={{ minHeight: height }}
        dependencies={deps}
        beforeCompile={setRenderCode}
        renderToolbar={renderToolbar}
        renderExtraFooter={() => (showEditor ? <AdCarbonInline /> : null)}
        onOpenEditor={() => setShowEditor(true)}
        onCloseEditor={() => setShowEditor(false)}
        className={classNames({ 'rs-show-editor': showEditor })}
      >
        {source}
      </ReactCodeView>
    );
  }
  return renderPlaceholder();
};

export default CodeView;
