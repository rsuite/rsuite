import React from 'react';
import classnames from 'classnames';
import { Icon } from '@rsuite/icons';
import Clipboard from 'rsuite-clipboard';

interface IconItemProps {
  onCopy: (text, result) => void;
  icon: any;
  newIcon: boolean;
}

export default function IconItem(props: IconItemProps) {
  const { onCopy, icon, newIcon, ...rest } = props;

  const handleCopy = React.useCallback(
    (text, result) => {
      onCopy?.(text, result);
    },
    [onCopy]
  );

  return (
    <Clipboard text={icon} onCopy={handleCopy}>
      <div className={classnames('icon-item', { 'new-icon': newIcon })}>
        <div className="icon-wrapper">
          <Icon as={icon} {...rest} className="icon-content" />
        </div>
        <p className="icon-name-text">{icon}</p>
      </div>
    </Clipboard>
  );
}
