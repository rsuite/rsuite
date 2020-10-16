import * as React from 'react';
import { Nav, Button, Icon, Row, Col, Slider } from 'rsuite';
import DefaultPage from '@/components/Page';
import ResponsiveNav from '@rsuite/responsive-nav';
import Link from 'next/link';

export default function Page() {
  return (
    <DefaultPage dependencies={{ Nav, Button, Icon, Row, Col, Slider, ResponsiveNav, Link }} />
  );
}
