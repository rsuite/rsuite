/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import React from 'react';
import { DecorativeBox } from '@/components/DecorativeBox';
import { Grid, Row, Col, Divider } from 'rsuite';

const App = () => (
  <Grid fluid>
    <Row>
      <Col span={{ xs: 24, sm: 12, md: 6 }}>
        <DecorativeBox>xs: 24, sm: 12, md: 6</DecorativeBox>
      </Col>
      <Col span={{ xs: 24, sm: 12, md: 6 }}>
        <DecorativeBox>xs: 24, sm: 12, md: 6</DecorativeBox>
      </Col>
      <Col span={{ xs: 24, sm: 12, md: 6 }}>
        <DecorativeBox>xs: 24, sm: 12, md: 6</DecorativeBox>
      </Col>
      <Col span={{ xs: 24, sm: 12, md: 6 }}>
        <DecorativeBox>xs: 24, sm: 12, md: 6</DecorativeBox>
      </Col>
    </Row>
    <Divider />
    <Row>
      <Col span={{ xs: 24, sm: 12, md: 8 }}>
        <DecorativeBox>xs: 24, sm: 12, md: 8</DecorativeBox>
      </Col>
      <Col span={{ xs: 24, sm: 12, md: 8 }}>
        <DecorativeBox>xs: 24, sm: 12, md: 8</DecorativeBox>
      </Col>
      <Col span={{ xs: 24, sm: 24, md: 8 }}>
        <DecorativeBox>xs: 24, sm: 24, md: 8</DecorativeBox>
      </Col>
    </Row>
    <Divider />
    <Row>
      <Col span={{ xs: 24, md: 16 }}>
        <DecorativeBox>xs: 24, md: 16</DecorativeBox>
      </Col>
      <Col span={{ xs: 12, md: 8 }}>
        <DecorativeBox>xs: 12, md: 8</DecorativeBox>
      </Col>
      <Col span={{ xs: 12, md: 8 }}>
        <DecorativeBox>xs: 12, md: 8</DecorativeBox>
      </Col>
      <Col span={{ xs: 24, md: 16 }}>
        <DecorativeBox>xs: 24, md: 16</DecorativeBox>
      </Col>
    </Row>
    <Divider />
    <Row>
      <Col span={{ xs: 24, sm: 12, lg: 6 }} hidden={{ md: true }}>
        <DecorativeBox>xs: 24, sm: 12, lg: 6 , md: hidden</DecorativeBox>
      </Col>
      <Col span={{ sm: 12, md: 8, lg: 6 }} hidden={{ xs: true }}>
        <DecorativeBox>sm: 12, md: 8, lg: 6, xs: hidden</DecorativeBox>
      </Col>
      <Col span={{ xs: 24, md: 8, lg: 6 }} hidden={{ sm: true }}>
        <DecorativeBox>xs: 24, md: 8, lg: 6, sm: hidden</DecorativeBox>
      </Col>
      <Col span={{ xs: 24, sm: 12, md: 8 }}>
        <DecorativeBox>xs: 24, sm: 12, md: 8</DecorativeBox>
      </Col>
    </Row>
    <Divider />
    <Row>
      <Col span={{ xs: 24, sm: 12, md: 6, lg: 3 }}>
        <DecorativeBox>xs: 24, sm: 12, md: 6, lg: 3</DecorativeBox>
      </Col>
      <Col span={{ xs: 24, sm: 12, md: 6, lg: 3 }}>
        <DecorativeBox>xs: 24, sm: 12, md: 6, lg: 3</DecorativeBox>
      </Col>
      <Col span={{ xs: 24, sm: 12, md: 6, lg: 3 }}>
        <DecorativeBox> xs: 24, sm: 12, md: 6, lg: 3 </DecorativeBox>
      </Col>
      <Col span={{ xs: 24, sm: 12, md: 6, lg: 3 }}>
        <DecorativeBox>xs: 24, sm: 12, md: 6, lg: 3 </DecorativeBox>
      </Col>
    </Row>
  </Grid>
);

export default App;
