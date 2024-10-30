import React from 'react';
import ArrowDownIcon from '@rsuite/icons/ArrowDown';
import ArrowRightIcon from '@rsuite/icons/ArrowRight';
import ArrowLeftIcon from '@rsuite/icons/ArrowLeft';
import Spinner from '@rsuite/icons/Spinner';
import { useClassNames } from '@/internals/hooks';
import { useTreeCustomRenderer } from '@/internals/Tree/TreeProvider';
import { useCustom } from '../CustomProvider';

interface TreeNodeToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any;
  loading?: boolean;
  expanded?: boolean;
  hasChildren?: boolean;
}

function TreeNodeToggle(props: TreeNodeToggleProps) {
  const { data, loading, expanded, hasChildren, ...rest } = props;
  const { rtl } = useCustom();
  const { renderTreeIcon } = useTreeCustomRenderer();
  const { prefix } = useClassNames('tree-node');
  const IconElementType = expanded ? ArrowDownIcon : rtl ? ArrowLeftIcon : ArrowRightIcon;

  let icon = <IconElementType className={prefix('toggle-icon')} />;

  if (loading) {
    icon = (
      <div className={prefix('loading-icon')}>
        <Spinner spin />
      </div>
    );
  }
  if (data !== undefined && typeof renderTreeIcon === 'function') {
    const customIcon = renderTreeIcon(data, expanded);
    icon = customIcon !== null ? <div className={prefix('custom-icon')}>{customIcon}</div> : icon;
  }

  return hasChildren ? (
    <div
      tabIndex={-1}
      role="button"
      aria-busy={loading ? true : undefined}
      data-ref={data.refKey}
      className={prefix('toggle')}
      {...rest}
    >
      {icon}
    </div>
  ) : (
    <div className={prefix('toggle-placeholder')} />
  );
}

export default TreeNodeToggle;
