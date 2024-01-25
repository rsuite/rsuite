import React from 'react';
import { VisuallyHidden, Button } from 'rsuite';
import { FaUniversalAccess } from 'react-icons/fa';
import DefaultPage from '@/components/Page';

export default function Page() {
  return <DefaultPage dependencies={{ VisuallyHidden, Button, FaUniversalAccess }} />;
}
