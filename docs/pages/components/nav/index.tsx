import * as React from 'react';
import { Nav, Button, Icon, Dropdown, Row, Col, Slider } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';
import ResponsiveNav from '@rsuite/responsive-nav';
import Link from 'next/link';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Nav"
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
    </Frame>
  );
}
