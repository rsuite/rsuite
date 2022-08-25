import React from 'react';
import {
  Button,
  Panel,
  PanelGroup,
  Table,
  Grid,
  Row,
  Col,
  Placeholder,
  Stack,
  ButtonGroup
} from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Table,
        PanelGroup,
        Panel,
        Stack,
        ButtonGroup,
        Button,
        Grid,
        Row,
        Col,
        Placeholder
      }}
    />
  );
}
