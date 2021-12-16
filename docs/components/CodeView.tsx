import React from 'react';
import { Sandpack } from '@codesandbox/sandpack-react';
import ReactCodeView from 'react-code-view';

export interface CodeViewProps extends React.HTMLAttributes<HTMLDivElement> {
  type: 'md' | 'js';
  theme?: 'light' | 'dark';
  classPrefix?: string;
  delay?: number;
  showCode?: boolean;
  source?: string;
  dependencies?: any;
  babelTransformOptions?: any;
  babelOptions?: any;
  buttonClassName?: string;
  showCodeIcon?: React.ReactNode;
  renderToolbar?: (button: React.ReactNode) => React.ReactNode;
}

export default React.memo(function CodeView({ type, ...props }: CodeViewProps) {
  if (type === 'md') {
    return <ReactCodeView classPrefix="rs-" {...props} />;
  }

  const { source } = props;

  return (
    <Sandpack
      template="react"
      files={{
        '/App.js': source
      }}
      customSetup={{
        dependencies: {
          rsuite: 'latest'
        }
      }}
      options={{
        externalResources: ['https://unpkg.com/rsuite/dist/rsuite.min.css']
      }}
    />
  );
});
