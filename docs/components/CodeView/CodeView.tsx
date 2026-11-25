import React, { useCallback, useMemo, useState, useRef } from 'react';
import {
  CodeEditor,
  CodeIcon,
  ErrorBoundary,
  parseHTML,
  useCodeExecution
} from '@react-code-view/react';
import classNames from 'classnames';
import canUseDOM from 'dom-lib/canUseDOM';
import toggleClass from 'dom-lib/toggleClass';
import GithubIcon from '@rsuite/icons/legacy/Github';
import Icon from '@rsuite/icons/Icon';
import stackBlitzSDK, { Project } from '@stackblitz/sdk';
import Paragraph from './Paragraph';
import HTMLRenderer from './HTMLRenderer';
import CopyCodeButton from './CopyCodeButton';
import CodeSandbox from './CodeSandbox';
import AdCarbonInline from '../AdCarbon/AdCarbonInline';
import { Divider, IconButton, Tooltip, Whisper, Placeholder } from 'rsuite';
import { TransparentIcon, CodesandboxIcon, StackBlitzIcon } from '@/components/icons';
import { useApp } from '@/hooks/useApp';
import { viteHtml, css, dependencies as codeDependencies, createVitePackageJson } from './utils';

export interface CustomCodeViewProps {
  className?: string;
  height?: number;
  dependencies?: any;
  source?: { default: string };
  path?: string;
  sandboxFiles?: { name: string; content: string; import?: boolean }[];
  sandboxDependencies?: any;
}

const CircleIconButton = React.forwardRef(({ icon, ...rest }: any, ref: React.Ref<any>) => (
  <IconButton
    {...rest}
    ref={ref}
    appearance="subtle"
    circle
    size="sm"
    type="submit"
    icon={<Icon as={icon} />}
  />
));

CircleIconButton.displayName = 'CircleIconButton';

type LiveExampleProps = Omit<CustomCodeViewProps, 'source'> & { source: string };

class ExampleErrorBoundary extends ErrorBoundary {
  componentDidUpdate(previous: React.ComponentProps<typeof ErrorBoundary>) {
    if (this.state.hasError && previous.children !== this.props.children) {
      this.setState({ hasError: false, error: null });
    }
  }
}

function stripImports(code: string) {
  return code.replace(/import [*\w,{} \n]+ from ?[."\x27@/\w-]+;/gi, '');
}

const LiveExample = (props: LiveExampleProps) => {
  const {
    dependencies,
    source,
    height = 100,
    path,
    sandboxFiles,
    sandboxDependencies,
    ...rest
  } = props;
  const { locales } = useApp();
  const [showEditor, setShowEditor] = useState(false);
  const viewRef = useRef<HTMLDivElement>(null);

  const deps = useMemo(() => ({ ...dependencies, Paragraph, Divider }), [dependencies]);
  const {
    code: sourceCode,
    updateCode,
    element,
    error
  } = useCodeExecution(source, {
    dependencies: deps,
    transformOptions: { transforms: ['jsx', 'typescript'] },
    afterCompile: stripImports
  });
  const code = useMemo(() => {
    const imports = [
      "import React from 'react';",
      "import ReactDOM from 'react-dom';",
      "import './styles.css';"
    ];

    sandboxFiles?.forEach(file => {
      if (file.import) {
        imports.push(`import './${file.name}';`);
      }
    });

    return [...imports, sourceCode].join('\n');
  }, [sandboxFiles, sourceCode]);

  const changeTransparent = useCallback(() => {
    toggleClass(viewRef.current, 'rs-code-transparent');
  }, []);

  const openStackBlitz = useCallback(() => {
    const depsFiles = {};
    const projectDependencies = { ...codeDependencies, ...sandboxDependencies };

    sandboxFiles?.forEach(file => {
      depsFiles[`src/${file.name}`] = file.content;
    });

    const project: Project = {
      title: 'rsuite example',
      description: 'Example from rsuitejs.com',
      template: 'node',
      files: {
        'package.json': createVitePackageJson(projectDependencies),
        'index.html': viteHtml,
        'src/index.jsx': code,
        'src/styles.css': css,
        ...depsFiles
      }
    };

    stackBlitzSDK.openProject(project, {
      openFile: 'src/index.jsx',
      startScript: 'dev'
    });
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
              return withWhisper({
                children: React.cloneElement(showCodeButton, {
                  'data-size': 'sm',
                  'data-appearance': 'subtle',
                  'data-shape': 'circle'
                }),
                i18nKey
              });
            }
            return withWhisper({
              children: <IconButton appearance="subtle" circle size="sm" {...rest} />,
              i18nKey
            });
          })}
        </>
      );
    },
    [code, tools, withWhisper]
  );

  return (
    <div
      ref={viewRef}
      style={{ minHeight: height }}
      className={classNames('rcv-container', rest.className, { 'rs-show-editor': showEditor })}
    >
      <div className="rcv-render">
        {error ? (
          <pre className="rcv-render-error" role="alert">
            {error.message}
          </pre>
        ) : (
          <ExampleErrorBoundary>{element}</ExampleErrorBoundary>
        )}
      </div>
      <div className="rcv-toolbar">
        {renderToolbar(
          <button
            type="button"
            role="switch"
            className="rs-btn rs-btn-icon"
            aria-checked={showEditor}
            aria-label={locales.common.showTheSource}
            onClick={() => setShowEditor(open => !open)}
          >
            <CodeIcon className="rs-icon" />
          </button>
        )}
      </div>
      {showEditor && (
        <>
          <div className="rcv-editor" dir="ltr">
            <CodeEditor code={sourceCode} onChange={updateCode} language="jsx" theme="dark" />
            <CopyCodeButton aria-label="Copy code" code={sourceCode} />
          </div>
          <AdCarbonInline />
        </>
      )}
    </div>
  );
};

const CodeView = ({ source, height = 100, ...props }: CustomCodeViewProps) => {
  const { styleLoaded } = useApp();

  if (!canUseDOM || !source || !styleLoaded) {
    return <Placeholder.Graph height={height} />;
  }

  return (
    <>
      {parseHTML(source.default)?.map(fragment =>
        fragment.type === 'code' ? (
          <LiveExample key={fragment.key} source={fragment.content} height={height} {...props} />
        ) : (
          <HTMLRenderer key={fragment.key}>{fragment.content}</HTMLRenderer>
        )
      )}
    </>
  );
};

CodeView.displayName = 'CodeView';

export default CodeView;
