import React from 'react';
import { ButtonToolbar, Button, IconButton, Drawer, RadioGroup, Radio, Placeholder } from 'rsuite';
import DefaultPage from '@/components/Page';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleDownIcon from '@rsuite/icons/legacy/AngleDown';
import AngleUpIcon from '@rsuite/icons/legacy/AngleUp';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Placeholder,
        ButtonToolbar,
        Button,
        IconButton,
        Drawer,
        RadioGroup,
        Radio,
        AngleRightIcon,
        AngleLeftIcon,
        AngleDownIcon,
        AngleUpIcon
      }}
    />
  );
}
