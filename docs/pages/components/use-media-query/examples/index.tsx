'use client';

import React from 'react';
import ExampleLoader from '@/components/ExampleLoader';

// Define all example component mappings
const examples = {
  'radio-tile': () => import('./radio-tile'),
  modal: () => import('./modal')
};

export default function Page() {
  return <ExampleLoader examples={examples} defaultExample="radio-tile" />;
}
