import * as React from 'react';

function Error({ statusCode }: any) {
  return (
    <p>
      <img alt="404" src="/images/error-404.svg" />
      {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
    </p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
