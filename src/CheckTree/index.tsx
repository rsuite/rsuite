import React from 'react';
import { FormControlPickerProps, RsRefForwardingComponent } from '../@types/common';
import CheckTreePicker, { ValueType } from '../CheckTreePicker';

import { TreeBaseProps } from '../Tree/Tree';

export interface CheckTreeProps
  extends TreeBaseProps<ValueType>,
    FormControlPickerProps<ValueType> {
  /** Tree node cascade */
  cascade?: boolean;
}

const CheckTree: RsRefForwardingComponent<
  'div',
  CheckTreeProps
> = React.forwardRef((props: CheckTreeProps, ref: React.Ref<any>) => (
  <CheckTreePicker ref={ref} inline {...props} />
));

CheckTree.displayName = 'CheckTree';

export default CheckTree;
