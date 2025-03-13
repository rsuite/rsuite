'use client';

import React from 'react';
import ExampleLoader from '@/components/ExampleLoader';

// Define all example component mappings
const examples = {
  horizontal: () => import('./horizontal'),
  vertical: () => import('./vertical'),
  center: () => import('./center'),
  'right-sidebar': () => import('./right-sidebar')
};

export default function Page() {
  return <ExampleLoader examples={examples} defaultExample="horizontal" />;
}
