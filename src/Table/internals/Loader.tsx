import React from 'react';
import type { TableLocaleType } from './types';

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  locale?: TableLocaleType;
  loadAnimation?: boolean;
  loading?: boolean;
  addPrefix: (...classes: any) => string;
  renderLoading?: (loading: React.ReactNode) => any;
}

const Loader = React.forwardRef((props: LoaderProps, ref: React.Ref<HTMLDivElement>) => {
  const { loadAnimation, loading, locale, addPrefix, renderLoading } = props;

  const loadingElement = (
    <div ref={ref} className={addPrefix('loader-wrapper')}>
      <div className={addPrefix('loader')}>
        <i className={addPrefix('loader-icon')} />
        <span className={addPrefix('loader-text')}>{locale?.loading}</span>
      </div>
    </div>
  );

  // Custom render a loader
  if (typeof renderLoading === 'function') {
    return loading ? renderLoading(loadingElement) : null;
  }

  // If loadAnimation is true , it returns the DOM element,
  // and controls whether the loader is displayed through CSS to achieve animation effect.
  return loading || loadAnimation ? loadingElement : null;
});

Loader.displayName = 'Table.Loader';

export default Loader;
