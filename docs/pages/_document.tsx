import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { getMessages } from '../locales';
import { getPages } from '../utils/pages';

interface DocumentProps {
  userLanguage: string;
  pathname: string;
}

class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const userLanguage = ctx.query.userLanguage;
    const pathname = ctx.pathname;

    return { userLanguage, pathname, ...initialProps };
  }

  render() {
    const { pathname, userLanguage } = this.props;
    getPages(getMessages(userLanguage));

    // 处理取到页面名称，处理 title
    console.log(pathname);

    return (
      <Html>
        <Head>
          <title>React Suite</title>
          <script type="text/javascript" src="/js/babel.min.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
