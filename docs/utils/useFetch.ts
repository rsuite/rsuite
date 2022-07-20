import React, { useEffect } from 'react';
import 'isomorphic-fetch';

const useFetch = (url: string, options?: any) => {
  const { defaultValue, ...rest } = options;
  const [response, setResponse] = React.useState(defaultValue);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, rest);
        const json = await res.json();
        setResponse(json);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);
  return { response, error };
};

export default useFetch;
