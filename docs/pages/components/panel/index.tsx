import React from 'react';
import { Button, Panel, PanelGroup, Table, Grid, Row, Col } from 'rsuite';
import DefaultPage from '@/components/Page';
import useFetchData from '@/utils/useFetchData';

const { HeaderCell, Cell, Column } = Table;

export default function Page() {
  const { response: tableData } = useFetchData('users');
  return (
    <DefaultPage
      examples={[
        'basic',
        'bordered',
        'shaded',
        'no-header',
        'card',
        'card-grid',
        'collapsible',
        'body-fill',
        'panel-group',
        'accordion-group',
        'accordion-group-active'
      ]}
      dependencies={{
        Table,
        PanelGroup,
        Panel,
        Button,
        HeaderCell,
        Cell,
        Column,
        Grid,
        Row,
        Col,
        tableData
      }}
    />
  );
}
