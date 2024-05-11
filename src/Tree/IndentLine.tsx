import React from 'react';
import { useClassNames } from '../utils';

const IndentLine = () => {
  const { prefix } = useClassNames('tree');
  return <span className={prefix('indent-line')} data-testid="indent-line" />;
};

export default IndentLine;
