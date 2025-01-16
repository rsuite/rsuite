'use client';

import React from 'react';
import ExampleLoader from '@/components/ExampleLoader';

// Define all example component mappings
const examples = {
  responsive: () => import('./responsive')
  // Add more examples here
  // basic: () => import('./basic'),
  // custom: () => import('./custom'),
};

export default function Page() {
  return <ExampleLoader examples={examples} defaultExample="responsive" />;
}
