import React from 'react';
import type { TableLocaleType } from './types';

interface EmptyMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  locale?: TableLocaleType;
  loading?: boolean;
  addPrefix: (...classes: any) => string;
  renderEmpty?: (info: React.ReactNode) => any;
}

const EmptyMessage = React.forwardRef(
  (props: EmptyMessageProps, ref: React.Ref<HTMLDivElement>) => {
    const { addPrefix, locale, renderEmpty, loading } = props;

    if (loading) {
      return null;
    }

    const emptyMessage = (
      <div ref={ref} className={addPrefix('body-info')}>
        {locale?.emptyMessage}
      </div>
    );

    return renderEmpty ? renderEmpty(emptyMessage) : emptyMessage;
  }
);
EmptyMessage.displayName = 'Table.EmptyMessage';

export default EmptyMessage;
