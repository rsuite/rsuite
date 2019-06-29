/* eslint-disable */
import * as React from 'react';
import TreePicker from '../TreePicker';

import { TreeProps } from './Tree.d';

const Tree = React.forwardRef((props: TreeProps, ref: React.Ref<any>) => (
  <TreePicker inline ref={ref} {...props} />
));

export default Tree;
