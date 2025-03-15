import React from 'react';
import { useStyles } from '@/internals/hooks';

const IndentLine = () => {
  const { prefix } = useStyles('tree');
  return <span className={prefix('indent-line')} data-testid="indent-line" />;
};

export default IndentLine;
