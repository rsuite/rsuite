import React from 'react';
import classnames from 'classnames';
import { IconProps } from '@rsuite/icons/lib/Icon';
import copyToClipboard from 'rsuite-utils/lib/utils/copyToClipboard';

export interface IconItemProps {
  onCopy: (text, result) => void;
  icon: React.FC<IconProps>;
  name: string;
  newIcon?: boolean;
}

const IconItem = (props: IconItemProps) => {
  const { onCopy, icon: IconComponent, name, newIcon, ...rest } = props;

  const handleCopy = React.useCallback(() => {
    const text = `<${name} />`;
    onCopy?.(text, copyToClipboard(text));
  }, [name, onCopy]);

  return (
    <div className={classnames('icon-item', { 'new-icon': newIcon })} onClick={handleCopy}>
      <div className="icon-wrapper">
        <IconComponent className="icon-content" {...rest} />
      </div>
      <p className="icon-name-text">{name}</p>
    </div>
  );
};

export default IconItem;
