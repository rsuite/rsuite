import React from 'react';
import NextHead from 'next/head';
import { useRouter } from 'next/router';
import { createBreadcrumbSchema, serializeJsonLd } from '@/utils/jsonld';

interface HeadProps {
  description: string;
  title: string;
  children?: React.ReactNode;
  /** Breadcrumb items for breadcrumb navigation JSON-LD schema */
  breadcrumbs?: Array<{ name: string; url?: string }>;
}

export default function Head(props: HeadProps) {
  const { description, title, children, breadcrumbs } = props;
  const pageTitle = `${title} - React Suite`;

  const router = useRouter();
  const currentUrl = `https://rsuitejs.com${router.asPath}`;

  // Generate breadcrumb JSON-LD schema if breadcrumbs are provided
  const jsonLdSchema = breadcrumbs ? createBreadcrumbSchema(breadcrumbs) : null;

  return (
    <NextHead>
      <title>{pageTitle}</title>
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
      <meta property="og:url" content={currentUrl} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://rsuitejs.com/images/logo.png" />
      <meta property="og:ttl" content="604800" />
      <link rel="shortcut icon" href="/favicon.ico" />

      {/* JSON-LD Structured Data */}
      {jsonLdSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLdSchema) }}
        />
      )}

      {children}
    </NextHead>
  );
}
