import React from 'react';
import { Timeline, Grid, Row, Col } from 'rsuite';
import DefaultPage from '@/components/Page';
import CreditCard from '@rsuite/icons/legacy/CreditCard';
import Plane from '@rsuite/icons/legacy/Plane';
import Truck from '@rsuite/icons/legacy/Truck';
import User from '@rsuite/icons/legacy/User';
import Check from '@rsuite/icons/legacy/Check';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{ Timeline, Grid, Row, Col, CreditCard, Plane, Truck, User, Check }}
    />
  );
}
