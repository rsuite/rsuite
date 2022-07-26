import React from 'react';
import { Timeline, Grid, Row, Col } from 'rsuite';
import DefaultPage from '@/components/Page';
import CreditCardIcon from '@rsuite/icons/legacy/CreditCard';
import PlaneIcon from '@rsuite/icons/legacy/Plane';
import TruckIcon from '@rsuite/icons/legacy/Truck';
import UserIcon from '@rsuite/icons/legacy/User';
import CheckIcon from '@rsuite/icons/legacy/Check';

import files from './files';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Timeline,
        Grid,
        Row,
        Col,
        CreditCardIcon,
        PlaneIcon,
        TruckIcon,
        UserIcon,
        CheckIcon
      }}
      sandboxFiles={files}
    />
  );
}
