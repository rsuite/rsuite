import React from 'react';
import { FormControlPickerProps, RsRefForwardingComponent } from '../@types/common';
import CheckTreePicker, { ValueType } from '../CheckTreePicker';

import { TreeBaseProps } from '../Tree/Tree';
import TreeContext from '../Tree/TreeContext';

export interface CheckTreeProps
  extends TreeBaseProps<ValueType>,
    FormControlPickerProps<ValueType> {
  /** Tree node cascade */
  cascade?: boolean;
}

const CheckTree: RsRefForwardingComponent<'div', CheckTreeProps> = React.forwardRef(
  (props: CheckTreeProps, ref: React.Ref<any>) => {
    return (
      <TreeContext.Provider value={{ inline: true }}>
        <CheckTreePicker ref={ref} {...props} />
      </TreeContext.Provider>
    );
  }
);

CheckTree.displayName = 'CheckTree';

export default CheckTree;
