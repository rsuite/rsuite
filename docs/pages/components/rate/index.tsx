import React from 'react';
import { Badge, Button, Toggle, Rate } from 'rsuite';
import DefaultPage from '@/components/Page';
import * as SvgIcons from '@/components/SvgIcons';
import { Icon } from '@rsuite/icons';
import Heart from '@rsuite/icons/legacy/Heart';
import Beer from '@rsuite/icons/legacy/Beer';
import FrownO from '@rsuite/icons/legacy/FrownO';
import MehO from '@rsuite/icons/legacy/MehO';
import SmileO from '@rsuite/icons/legacy/SmileO';

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
        Heart,
        Beer,
        FrownO,
        MehO,
        SmileO,
      }}
    />
  );
}
