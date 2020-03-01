import * as React from 'react';
import useFetch from './useFetch';
import AppContext from '@/components/AppContext';

const useFetchData = (name: string, options?: any) => {
  const { language } = React.useContext(AppContext);
  const url = `/data${language === 'en' ? '/en' : ''}/${name}.json`;
  return useFetch(url, {
    ...options,
    defaultValue: []
  });
};

export default useFetchData;
