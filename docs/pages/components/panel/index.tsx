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
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Panel', 'PanelGroup']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
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
