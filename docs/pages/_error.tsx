import * as React from 'react';
import Link from 'next/link';
import AppContext from '@/components/AppContext';

interface ErrorProps {
  statusCode: number;
}

function Error({ statusCode = 404 }: ErrorProps) {
  const { language, messages } = React.useContext(AppContext);
  return (
    <>
      <div className="error-wrapper">
        <img alt="404" src="/images/error-404.svg" />
        <h2>{`${messages?.common.notFount}（${statusCode}）`}</h2>
        <div className="nav-help">
          <Link href={language === 'en' ? '/en/' : '/'}>
            <a>{messages?.common.goHomePage}</a>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .error-wrapper {
          position: absolute;
          width: 480px;
          left: 50%;
          top: 50%;
          padding: 10px;
          font-size: 14px;
          text-align: center;
          margin-top: -165px;
          margin-left: -230px;
        }
        h2 {
          font-size: 18px;
        }

        .title {
          margin: 0 0 40px;
          color: @H500;
          font-size: 100px;
          font-weight: 700;
        }

        .nav-help {
          cursor: pointer;
          padding: 10px 0;
        }
      `}</style>
    </>
  );
}

Error.getInitialProps = ({ res, err }): Pick<ErrorProps, 'statusCode'> => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 404;
  return { statusCode };
};

export default Error;
