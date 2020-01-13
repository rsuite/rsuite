import * as React from 'react';
import classnames from 'classnames';
import { Icon } from 'rsuite';
import Clipboard from 'rsuite-clipboard';

interface IconItemProps {
  onCopy: (text, result) => void;
  icon: any;
  newIcon: boolean;
}

export default function IconItem(props: IconItemProps) {
  const { onCopy, newIcon, ...rest } = props;

  function handleCopy(text, result) {
    onCopy?.(text, result);
  }

  return (
    <Clipboard text={this.props.icon} onCopy={handleCopy}>
      <div className={classnames('icon-item', { 'new-icon': newIcon })}>
        <div className="icon-wrapper">
          <Icon {...rest} className="icon-content" />
        </div>
        <p className="icon-name-text">{this.props.icon}</p>
      </div>
    </Clipboard>
  );
}
