import React from 'react';
import CodeView from 'react-code-view';

const editorProps = {
  classPrefix: 'rs',
  buttonClassName: 'rs-btn rs-btn-sm rs-btn-subtle rs-btn-icon-circle rs-btn-icon'
};

const afterCompile = (code: string) => {
  // eslint-disable-next-line no-useless-escape
  return code.replace(/import\ [\*\w\,\{\}\ \n]+\ from\ ?[\."'@/\w-]+;/gi, '');
};

export default React.forwardRef(function ReactCodeView(props: any, ref) {
  return (
    <CodeView {...props} ref={ref} theme="dark" editor={editorProps} afterCompile={afterCompile} />
  );
});
