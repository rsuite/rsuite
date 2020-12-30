import React from 'react';
import { Badge, Button, Toggle, Rate } from 'rsuite';
import DefaultPage from '@/components/Page';
import * as SvgIcons from '@/components/SvgIcons';
import { Icon } from '@rsuite/icons';
import HeartIcon from '@rsuite/icons/legacy/Heart';
import BeerIcon from '@rsuite/icons/legacy/Beer';
import FrownIcon from '@rsuite/icons/legacy/FrownO';
import MehIcon from '@rsuite/icons/legacy/MehO';
import SmileIcon from '@rsuite/icons/legacy/SmileO';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Badge,
        Button,
        Toggle,
        Rate,
        Icon,
        SvgIcons,
        HeartIcon,
        BeerIcon,
        FrownIcon,
        MehIcon,
        SmileIcon
      }}
    />
  );
}
