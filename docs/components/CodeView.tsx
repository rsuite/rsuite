import React from 'react';
import ReactCodeView from 'react-code-view';

export interface CodeViewProps extends React.HTMLAttributes<HTMLDivElement> {
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

export default React.memo(function CodeView(props: CodeViewProps) {
  return <ReactCodeView classPrefix="rs-" {...props} />;
});
