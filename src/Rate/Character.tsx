import * as React from 'react';
import classNames from 'classnames';
import { defaultProps, prefix } from '../utils';

const characterStatus = {
  [0]: 'empty',
  [0.5]: 'half',
  [1]: 'full'
};

interface CharacterProps {
  children?: React.ReactNode;
  vertical?: boolean;
  status?: number;
  classPrefix?: string;
  onBeforeMouseMove?: () => void;
  onAfterMouseMove?: () => void;
  [key: string]: any;
}

class Character extends React.Component<CharacterProps> {
  render() {
    const {
      children,
      vertical,
      classPrefix,
      onBeforeMouseMove,
      onAfterMouseMove,
      status,
      ...rest
    } = this.props;

    const addPrefix = prefix(classPrefix);

    return (
      <li {...rest} className={classNames(classPrefix, addPrefix(characterStatus[status]))}>
        <div
          className={classNames(addPrefix('before'), { [addPrefix('vertical')]: vertical })}
          onMouseMove={onBeforeMouseMove}
        >
          {children}
        </div>
        <div className={addPrefix('after')} onMouseMove={onAfterMouseMove}>
          {children}
        </div>
      </li>
    );
  }
}

export default defaultProps<CharacterProps>({
  classPrefix: 'rate-character'
})(Character);
