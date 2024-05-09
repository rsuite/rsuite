import React from 'react';
import ArrowDown from '@rsuite/icons/legacy/ArrowDown';
import Spinner from '@rsuite/icons/legacy/Spinner';
import { useClassNames } from '../utils';
import { useTreeCustomRenderer } from './TreeProvider';

interface TreeNodeToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any;
  expanded?: boolean;
  loading?: boolean;
  hasChildren?: boolean;
}

function TreeNodeToggle(props: TreeNodeToggleProps) {
  const { data, expanded, loading, hasChildren, ...rest } = props;
  const { renderTreeIcon } = useTreeCustomRenderer();
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
      tabIndex={-1}
      role="button"
      aria-busy={loading ? true : undefined}
      data-ref={data.refKey}
      className={prefix('expand-icon-wrapper')}
      {...rest}
    >
      {icon}
    </div>
  ) : null;
}

export default TreeNodeToggle;
