import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';
import {
  createOrganizationSchema,
  createSoftwareApplicationSchema,
  createSoftwareSourceCodeSchema,
  serializeJsonLd
} from '../utils/jsonld';

export default function Document() {
  // Generate global JSON-LD schemas
  const organizationSchema = createOrganizationSchema();
  const softwareAppSchema = createSoftwareApplicationSchema();
  const sourceCodeSchema = createSoftwareSourceCodeSchema();

  return (
    <Html>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@alpha" />
        {/* Import CSS for nprogress */}
        <link rel="stylesheet" type="text/css" href="/css/nprogress.css" />

        {/* Global JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(softwareAppSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(sourceCodeSchema) }}
        />

        <script async src="https://www.googletagmanager.com/gtag/js?id=G-3VVC8ZNFF9"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-3VVC8ZNFF9');
`
          }}
        />
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
      </body>
    </Html>
  );
}
