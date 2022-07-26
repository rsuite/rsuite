import React from 'react';
import { Nav, Button, Row, Col, Slider } from 'rsuite';
import DefaultPage from '@/components/Page';
import ResponsiveNav from '@rsuite/responsive-nav';
import Link from 'next/link';

import HomeIcon from '@rsuite/icons/legacy/Home';
import FacebookSquareIcon from '@rsuite/icons/legacy/FacebookSquare';
import GithubAltIcon from '@rsuite/icons/legacy/GithubAlt';
import CircleIcon from '@rsuite/icons/legacy/Circle';
import ChromeIcon from '@rsuite/icons/legacy/Chrome';
import EllipsisHIcon from '@rsuite/icons/legacy/EllipsisH';
import DropboxIcon from '@rsuite/icons/legacy/Dropbox';
import FirefoxIcon from '@rsuite/icons/legacy/Firefox';
import GitlabIcon from '@rsuite/icons/legacy/Gitlab';
import LinuxIcon from '@rsuite/icons/legacy/Linux';
import MoreIcon from '@rsuite/icons/More';
import StarIcon from '@rsuite/icons/legacy/Star';

const sandboxDependencies = {
  '@rsuite/responsive-nav': 'latest'
};

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
        HomeIcon,
        Link,
        FacebookSquareIcon,
        GithubAltIcon,
        CircleIcon,
        ChromeIcon,
        EllipsisHIcon,
        DropboxIcon,
        FirefoxIcon,
        GitlabIcon,
        LinuxIcon,
        MoreIcon,
        StarIcon
      }}
      sandboxDependencies={sandboxDependencies}
    />
  );
}
