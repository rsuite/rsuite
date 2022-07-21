import React from 'react';
import { Breadcrumb } from 'rsuite';
import Link from 'next/link';
import DefaultPage from '@/components/Page';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';

const sandboxDependencies = {
  next: '^12.1.0'
};
export default function Page() {
  return (
    <DefaultPage
      dependencies={{ Breadcrumb, Link, AngleRightIcon }}
      sandboxDependencies={sandboxDependencies}
    />
  );
}
