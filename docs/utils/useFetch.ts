import * as React from 'react';
import 'isomorphic-fetch';

const useFetch = (url: string, options?: any) => {
  const { defaultValue, ...rest } = options;
  const [response, setResponse] = React.useState(defaultValue);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
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
  }, [url]);
  return { response, error };
};

export default useFetch;
