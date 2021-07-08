import React from 'react';
import { ButtonToolbar, Button, IconButton, Drawer, RadioGroup, Radio } from 'rsuite';
import DefaultPage from '@/components/Page';
import AngleRight from '@rsuite/icons/legacy/AngleRight';
import AngleLeft from '@rsuite/icons/legacy/AngleLeft';
import AngleDown from '@rsuite/icons/legacy/AngleDown';
import AngleUp from '@rsuite/icons/legacy/AngleUp';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        ButtonToolbar,
        Button,
        IconButton,
        Drawer,
        RadioGroup,
        Radio,
        AngleRight,
        AngleLeft,
        AngleDown,
        AngleUp
      }}
    />
  );
}
