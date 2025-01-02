import React from 'react';
import { Badge, Button, Toggle, Rate, VStack } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import Icon from '@rsuite/icons/Icon';
import HeartIcon from '@rsuite/icons/legacy/Heart';
import BeerIcon from '@rsuite/icons/legacy/Beer';
import FrownIcon from '@rsuite/icons/legacy/FrownO';
import MehIcon from '@rsuite/icons/legacy/MehO';
import SmileIcon from '@rsuite/icons/legacy/SmileO';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Rate']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Badge,
        Button,
        Toggle,
        Rate,
        Icon,
        VStack,
        HeartIcon,
        BeerIcon,
        FrownIcon,
        MehIcon,
        SmileIcon
      }}
    />
  );
}
