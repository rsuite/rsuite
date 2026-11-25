'use client';

import ExampleLoader from '@/components/ExampleLoader';

// Define all example component mappings
const examples = {
  avatar: () => import('./avatar'),
  stack: () => import('./stack')
};

export default function Page() {
  return <ExampleLoader examples={examples} defaultExample="avatar" />;
}
