import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

interface DocumentProps {
  userLanguage: string;
}

class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, userLanguage: ctx.query.userLanguage || 'en' };
  }

  render() {
    const { userLanguage } = this.props;

    return (
      <Html lang={userLanguage}>
        <Head>
          <script type="text/javascript" src="/js/babel.min.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(i,d,t,o,u,h,s,f){i[t]=i[t]||[], i[t].push(h);
                i[h]=i[h]||function(){return (i[h].q=i[h].q||[]).push(arguments)};
                s=d.createElement(o);s.src=u;s.async=1;f=d.getElementsByTagName(o)[0];
                f.parentNode.insertBefore(s, f);
                })(window, document, 'HyperAnalyticsObject', 'script', '//t.hypers.com.cn/hwt.js', '_ha');
                _ha('create', '5156', { auto_track: true });
                _ha('send', 'pageview');
              `
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              ((window.gitter = {}).chat = {}).options = {
                room: 'rsuite/${userLanguage === 'zh' ? 'rsuite-CN' : 'rsuite'}'
              };
              `
            }}
          ></script>
          <script src="https://sidecar.gitter.im/dist/sidecar.v1.js" async defer></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
