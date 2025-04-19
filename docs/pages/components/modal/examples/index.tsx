'use client';

import React from 'react';
import ExampleLoader from '@/components/ExampleLoader';

// Define all example component mappings
const examples = {
  responsive: () => import('./responsive')
};

export default function Page() {
  return <ExampleLoader examples={examples} defaultExample="responsive" />;
}
