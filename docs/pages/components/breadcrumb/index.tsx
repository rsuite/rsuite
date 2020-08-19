import * as React from 'react';
import { Breadcrumb, Icon } from 'rsuite';
import Link from 'next/link';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      examples={['basic', 'separator', 'max-items', 'with-router']}
      dependencies={{ Breadcrumb, Icon, Link }}
    />
  );
}
