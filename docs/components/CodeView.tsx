import React from 'react';
import ReactCodeView from 'react-code-view';

export default React.memo(function CodeView(props: any) {
  return (
    <ReactCodeView
      {...props}
      afterCompile={(code: string) => {
        return code.replace(/import\ [\w\,\{\}\ ]+\ from\ "[\w-]+";/gi, '');
      }}
    />
  );
});
