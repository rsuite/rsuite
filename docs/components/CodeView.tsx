import * as React from 'react';
import ReactCodeView from 'react-code-view';

export default React.memo(function CodeView(props: any) {
  return <ReactCodeView classPrefix="rs-" {...props} />;
});
