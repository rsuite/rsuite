import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    const { locale } = this.props;

    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@alpha" />
          {/* Import CSS for nprogress */}
          <link rel="stylesheet" type="text/css" href="/css/nprogress.css" />
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
                room: 'rsuite/${locale === 'zh' ? 'rsuite-CN' : 'rsuite'}'
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
