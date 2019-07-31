import * as React from 'react';
import CheckTreePicker from '../CheckTreePicker';

import { CheckTreeProps } from './CheckTree.d';

const CheckTree = React.forwardRef((props: CheckTreeProps, ref: React.Ref<any>) => (
  <CheckTreePicker ref={ref} inline {...props} />
));

CheckTree.displayName = 'CheckTree';

export default CheckTree;
