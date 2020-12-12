import React from 'react';
import { Nav, Button, Row, Col, Slider } from 'rsuite';
import DefaultPage from '@/components/Page';
import ResponsiveNav from '@rsuite/responsive-nav';
import Link from 'next/link';
import Home from '@rsuite/icons/legacy/Home';
import FacebookSquare from '@rsuite/icons/legacy/FacebookSquare';
import GithubAlt from '@rsuite/icons/legacy/GithubAlt';
import Circle from '@rsuite/icons/legacy/Circle';
import Chrome from '@rsuite/icons/legacy/Chrome';
import EllipsisH from '@rsuite/icons/legacy/EllipsisH';
import Dropbox from '@rsuite/icons/legacy/Dropbox';
import Firefox from '@rsuite/icons/legacy/Firefox';
import Gitlab from '@rsuite/icons/legacy/Gitlab';
import Linux from '@rsuite/icons/legacy/Linux';
import More from '@rsuite/icons/More';
import Star from '@rsuite/icons/legacy/Star';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Nav,
        Button,
        Row,
        Col,
        Slider,
        ResponsiveNav,
        Home,
        Link,
        FacebookSquare,
        GithubAlt,
        Circle,
        Chrome,
        EllipsisH,
        Dropbox,
        Firefox,
        Gitlab,
        Linux,
        More,
        Star
      }}
    />
  );
}
