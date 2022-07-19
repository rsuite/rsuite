import React from 'react';
import ReactCodeView from 'react-code-view';

const editorProps = {
  classPrefix: 'rs',
  buttonClassName: 'rs-btn-subtle rs-btn-icon-circle rs-btn-icon'
};

export default React.memo((props: any) => {
  return (
    <ReactCodeView
      {...props}
      theme="dark"
      editor={editorProps}
      afterCompile={(code: string) => {
        return code.replace(/import\ [\w\,\{\}\ ]+\ from\ ?["'@/\w-]+;/gi, '');
      }}
    />
  );
});
