/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import React from 'react';
import { DecorativeBox } from '@/components/DecorativeBox';
import { Grid, Row, Col, Divider } from 'rsuite';

const App = () => (
  <Grid fluid>
    {/* Basic responsive column layout */}
    <Divider>Responsive Columns</Divider>
    <Row>
      <Col xs={24} md={12}>
        <DecorativeBox>xs=24, md=12</DecorativeBox>
      </Col>
      <Col xs={24} md={12}>
        <DecorativeBox>xs=24, md=12</DecorativeBox>
      </Col>
    </Row>

    {/* Responsive gutter and alignment */}
    <Divider>Responsive Gutter & Alignment</Divider>
    <Row
      gutter={{
        xs: 8, // Compact layout for mobile
        md: 24 // Loose layout for desktop
      }}
      align={{
        xs: 'top', // Top alignment for mobile
        md: 'middle' // Middle alignment for desktop
      }}
    >
      <Col xs={24} md={8}>
        <DecorativeBox>Col 1</DecorativeBox>
      </Col>
      <Col xs={24} md={8}>
        <DecorativeBox height={80}>Col 2</DecorativeBox>
      </Col>
      <Col xs={24} md={8}>
        <DecorativeBox>Col 3</DecorativeBox>
      </Col>
    </Row>

    {/* Responsive horizontal distribution */}
    <Divider>Responsive Justify</Divider>
    <Row
      justify={{
        xs: 'center', // Center for mobile
        md: 'space-between' // Space between for desktop
      }}
    >
      <Col xs={8}>
        <DecorativeBox>Col 1</DecorativeBox>
      </Col>
      <Col xs={8}>
        <DecorativeBox>Col 2</DecorativeBox>
      </Col>
    </Row>

    {/* Complex responsive layout combination */}
    <Divider>Complex Responsive Layout</Divider>
    <Row
      gutter={{
        xs: 8,
        md: 16
      }}
    >
      {/* Main content area */}
      <Col xs={24} md={16}>
        <DecorativeBox height={134}>
          Main Content
          <br />
          xs=24, md=16
        </DecorativeBox>
      </Col>
      {/* Sidebar */}
      <Col xs={24} md={8}>
        <Row>
          <Col xs={12} md={24}>
            <DecorativeBox>
              Sidebar Top
              <br />
              xs=12, md=24
            </DecorativeBox>
          </Col>
          <Col xs={12} md={24}>
            <DecorativeBox>
              Sidebar Bottom
              <br />
              xs=12, md=24
            </DecorativeBox>
          </Col>
        </Row>
      </Col>
    </Row>
  </Grid>
);

export default App;
