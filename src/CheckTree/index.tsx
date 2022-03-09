import React, { useMemo } from 'react';
import { FormControlPickerProps, RsRefForwardingComponent } from '../@types/common';
import CheckTreePicker, { ValueType } from '../CheckTreePicker';

import { TreeBaseProps } from '../Tree/Tree';
import TreeContext from '../Tree/TreeContext';

export interface CheckTreeProps
  extends TreeBaseProps<ValueType>,
    FormControlPickerProps<ValueType> {
  /** Tree node cascade */
  cascade?: boolean;

  /** Set the option value for the check box not to be rendered */
  uncheckableItemValues?: ValueType;
}

const CheckTree: RsRefForwardingComponent<'div', CheckTreeProps> = React.forwardRef(
  (props: CheckTreeProps, ref: React.Ref<any>) => {
    const contextValue = useMemo(() => ({ inline: true }), []);
    return (
      <TreeContext.Provider value={contextValue}>
        <CheckTreePicker ref={ref} {...props} />
      </TreeContext.Provider>
    );
  }
);

CheckTree.displayName = 'CheckTree';

export default CheckTree;
