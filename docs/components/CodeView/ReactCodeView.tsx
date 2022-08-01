import React from 'react';
import ReactCodeView from 'react-code-view';

const editorProps = {
  classPrefix: 'rs',
  buttonClassName: 'rs-btn-subtle rs-btn-icon-circle rs-btn-icon'
};

const afterCompile = (code: string) => {
  return code.replace(/import\ [\*\w\,\{\}\ \n]+\ from\ ?[\."'@/\w-]+;/gi, '');
};

export default React.forwardRef((props: any, ref) => {
  return (
    <ReactCodeView
      {...props}
      ref={ref}
      theme="dark"
      editor={editorProps}
      afterCompile={afterCompile}
    />
  );
});
