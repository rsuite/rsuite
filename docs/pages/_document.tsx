import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

interface DocumentProps {
  userLanguage: string;
}

class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const userLanguage = ctx.query.userLanguage;

    return { userLanguage, ...initialProps };
  }

  render() {
    const { userLanguage } = this.props;
    console.log('document', userLanguage);

    return (
      <Html lang={userLanguage}>
        <Head>
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
