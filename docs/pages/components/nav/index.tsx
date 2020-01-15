import * as React from 'react';
import { Nav, Button, Icon, Dropdown, Row, Col, Slider } from 'rsuite';
import DefaultPage from '@/components/Page';
import ResponsiveNav from '@rsuite/responsive-nav';
import Link from 'next/link';

export default function Page() {
  return (
    <DefaultPage
      examples={[
        'basic',
        'appearance',
        'vertical',
        'status',
        'justified',
        'dropdown',
        'icon',
        'with-router',
        'responsive-nav',
        'removable-nav'
      ]}
      dependencies={{ Nav, Button, Icon, Dropdown, Row, Col, Slider, ResponsiveNav, Link }}
    />
  );
}
