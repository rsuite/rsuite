import React from 'react';
import { useStyles } from '@/internals/hooks';

export interface IndicatorProps {
  style: React.CSSProperties;
  classPrefix: string;
}

const Indicator = ({ style, classPrefix }: IndicatorProps) => {
  const { prefix } = useStyles(classPrefix);
  return <div className={prefix('indicator')} style={style} />;
};

Indicator.displayName = 'Indicator';

export default Indicator;
