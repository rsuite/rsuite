import React from 'react';
import { useClassNames } from '../utils';
import useCombobox from '../internals/Picker/hooks/useCombobox';

const TagList = React.forwardRef(
  (props: React.HTMLAttributes<HTMLDivElement>, ref: React.Ref<HTMLDivElement>) => {
    const { children, ...rest } = props;
    const { prefix } = useClassNames('picker');
    const { id } = useCombobox();

    return (
      <div ref={ref} role="listbox" id={`${id}-describe`} className={prefix`tag-list`} {...rest}>
        {children}
      </div>
    );
  }
);

export default TagList;
