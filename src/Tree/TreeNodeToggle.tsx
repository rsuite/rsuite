import React from 'react';
import ArrowDown from '@rsuite/icons/legacy/ArrowDown';
import Spinner from '@rsuite/icons/legacy/Spinner';
import { useClassNames } from '../utils';

interface TreeNodeToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any;
  expanded?: boolean;
  loading?: boolean;
  hasChildren?: boolean;
  renderTreeIcon?: (data: any) => React.ReactNode;
}

function TreeNodeToggle(props: TreeNodeToggleProps) {
  const { data, expanded, loading, renderTreeIcon, hasChildren, ...rest } = props;
  const { prefix } = useClassNames('tree-node');
  const classes = prefix('expand-icon', 'icon', { expanded });

  let icon = <ArrowDown className={classes} />;

  if (loading) {
    icon = (
      <div className={prefix('loading-icon')}>
        <Spinner spin />
      </div>
    );
  }
  if (data !== undefined && typeof renderTreeIcon === 'function') {
    const customIcon = renderTreeIcon(data);
    icon = customIcon !== null ? <div className={prefix('custom-icon')}>{customIcon}</div> : icon;
  }

  return hasChildren ? (
    <div
      role="button"
      tabIndex={-1}
      data-ref={data.refKey}
      className={prefix('expand-icon-wrapper')}
      {...rest}
    >
      {icon}
    </div>
  ) : null;
}

export default TreeNodeToggle;
