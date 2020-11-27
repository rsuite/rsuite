import React from 'react';
import { Breadcrumb } from 'rsuite';
import Link from 'next/link';
import DefaultPage from '@/components/Page';
import AngleRight from '@rsuite/icons/legacy/AngleRight';

export default function Page() {
  return <DefaultPage dependencies={{ Breadcrumb, Link, AngleRight }} />;
}
