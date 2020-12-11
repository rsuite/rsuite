import React from 'react';
import classnames from 'classnames';
import { IconProps } from '@rsuite/icons/lib/Icon';

export interface IconItemProps {
  onSelect: (name: string, event: React.MouseEvent) => void;
  icon: React.FC<IconProps>;
  name: string;
  newIcon?: boolean;
}

const IconItem = (props: IconItemProps) => {
  const { onSelect, icon: IconComponent, name, newIcon, ...rest } = props;

  const handleSelect = React.useCallback(
    event => {
      onSelect?.(name, event);
    },
    [name, onSelect]
  );

  return (
    <div
      className={classnames('icon-item', { 'new-icon': newIcon })}
      tabIndex={0}
      onClick={handleSelect}
    >
      <div className="icon-wrapper">
        <IconComponent className="icon-svg" {...rest} />
      </div>
      <p className="icon-label">{name}</p>
    </div>
  );
};

export default IconItem;
