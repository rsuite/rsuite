import * as React from 'react';
import NextHead from 'next/head';
import { Router, useRouter } from 'next/router';

interface HeadProps {
  description: string;
  title: string;
  children?: React.ReactNode;
}

export default function Head(props: HeadProps) {
  const { description, title, children } = props;
  const router = useRouter();

  return (
    <NextHead>
      <title>{title} - React Suite</title>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@rsuite" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://rsuitejs.com/images/logo.png" />
      {/* Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta
        property="og:url"
        content={`https://rsuitejs.com${Router._rewriteUrlForNextExport(router.asPath)}`}
      />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://rsuitejs.com/images/logo.png" />
      <meta property="og:ttl" content="604800" />
      <link rel="shortcut icon" href="/favicon.ico" />

      {/* Import CSS for nprogress */}
      <link rel="stylesheet" type="text/css" href="/css/nprogress.css" />
      {children}
    </NextHead>
  );
}
