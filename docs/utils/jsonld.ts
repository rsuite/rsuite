/**
 * JSON-LD Schema.org utilities for RSuite documentation
 * Provides structured data for better SEO and rich snippets
 */

export interface Organization {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  sameAs: string[];
  description?: string;
}

export interface SoftwareApplication {
  '@context': 'https://schema.org';
  '@type': 'SoftwareApplication';
  name: string;
  applicationCategory: string;
  operatingSystem: string;
  offers?: {
    '@type': 'Offer';
    price: string;
    priceCurrency: string;
  };
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: string;
    ratingCount: string;
  };
}

export interface WebPage {
  '@context': 'https://schema.org';
  '@type': 'WebPage';
  name: string;
  description: string;
  url: string;
  inLanguage?: string;
  isPartOf?: {
    '@type': 'WebSite';
    name: string;
    url: string;
  };
}

export interface Article {
  '@context': 'https://schema.org';
  '@type': 'Article' | 'TechArticle';
  headline: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  author?: {
    '@type': 'Organization';
    name: string;
  };
  publisher?: {
    '@type': 'Organization';
    name: string;
    logo: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  inLanguage?: string;
}

export interface BreadcrumbList {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }>;
}

export interface SoftwareSourceCode {
  '@context': 'https://schema.org';
  '@type': 'SoftwareSourceCode';
  name: string;
  description: string;
  codeRepository: string;
  programmingLanguage: string;
  runtimePlatform: string;
  author?: {
    '@type': 'Organization';
    name: string;
  };
}

/**
 * Generate Organization schema for RSuite
 */
export function createOrganizationSchema(): Organization {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'React Suite',
    url: 'https://rsuitejs.com',
    logo: 'https://rsuitejs.com/images/react-suite.png',
    sameAs: [
      'https://github.com/rsuite/rsuite',
      'https://x.com/reactsuite',
      'https://www.npmjs.com/package/rsuite',
      'https://opencollective.com/rsuite'
    ],
    description:
      'A suite of React components, sensible UI design, and a friendly development experience.'
  };
}

/**
 * Generate SoftwareApplication schema for RSuite
 */
export function createSoftwareApplicationSchema(): SoftwareApplication {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'React Suite',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Cross-platform',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };
}

/**
 * Generate WebPage schema
 */
export function createWebPageSchema(options: {
  title: string;
  description: string;
  url: string;
  language?: string;
}): WebPage {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: options.title,
    description: options.description,
    url: options.url,
    inLanguage: options.language || 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: 'React Suite Documentation',
      url: 'https://rsuitejs.com'
    }
  };
}

/**
 * Generate Article schema for documentation pages
 */
export function createArticleSchema(options: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  language?: string;
}): Article {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: options.title,
    description: options.description,
    url: options.url,
    datePublished: options.datePublished,
    dateModified: options.dateModified,
    author: {
      '@type': 'Organization',
      name: 'React Suite Team'
    },
    publisher: {
      '@type': 'Organization',
      name: 'React Suite',
      logo: {
        '@type': 'ImageObject',
        url: 'https://rsuitejs.com/images/react-suite.png'
      }
    },
    inLanguage: options.language || 'en'
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function createBreadcrumbSchema(
  items: Array<{ name: string; url?: string }>
): BreadcrumbList {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

/**
 * Generate SoftwareSourceCode schema
 */
export function createSoftwareSourceCodeSchema(): SoftwareSourceCode {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: 'React Suite',
    description:
      'A suite of React components, sensible UI design, and a friendly development experience.',
    codeRepository: 'https://github.com/rsuite/rsuite',
    programmingLanguage: 'TypeScript',
    runtimePlatform: 'React',
    author: {
      '@type': 'Organization',
      name: 'React Suite Team'
    }
  };
}

/**
 * Serialize JSON-LD object to string for script tag
 */
export function serializeJsonLd(data: any): string {
  return JSON.stringify(data, null, 0);
}
