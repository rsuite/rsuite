import React from 'react';
import ScrollView from '@/internals/ScrollView';

interface TimeColumnProps {
  prefix: (name: string) => string;
  title: React.ReactNode;
  children: React.ReactNode;
}

const TimeColumn = (props: TimeColumnProps) => {
  const { prefix, title, children, ...rest } = props;
  return (
    <div className={prefix('column')}>
      <div className={prefix('column-title')}>{title}</div>
      <ScrollView customScrollbar as="ul" role="listbox" {...rest}>
        {children}
      </ScrollView>
    </div>
  );
};

export default TimeColumn;
