import React, { useCallback } from 'react';
import classnames from 'classnames';
import { IconProps } from '@rsuite/icons/Icon';
import styles from './IconList.module.scss';

export interface IconItemProps {
  onSelect: (name: string, event: React.MouseEvent) => void;
  icon: React.FC<IconProps>;
  name: string;
  newIcon?: boolean;
}

const IconItem = (props: IconItemProps) => {
  const { onSelect, icon: IconComponent, name, newIcon, ...rest } = props;

  const handleSelect = useCallback(
    event => {
      onSelect?.(name, event);
    },
    [name, onSelect]
  );

  return (
    <div
      className={classnames(styles['icon-item'], { [styles['new-icon']]: newIcon })}
      tabIndex={0}
      onClick={handleSelect}
    >
      <IconComponent className={styles['icon-svg']} {...rest} />
    </div>
  );
};

export default IconItem;
