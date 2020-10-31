import React from 'react';
import { Carousel, Radio, RadioGroup, Divider } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return <DefaultPage dependencies={{ Carousel, Radio, RadioGroup, Divider }} />;
}
