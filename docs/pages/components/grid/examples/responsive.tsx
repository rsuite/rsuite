import React from 'react';
import { Grid, Row, Col, Divider, Center } from 'rsuite';

const DecorativeBox = ({ children, ...rest }) => (
  <Center bg="gray.100" p={20} my={6} rounded="lg" color="gray.500" {...rest}>
    {children}
  </Center>
);

const App = () => (
  <Grid fluid>
    <Divider>Responsive Columns</Divider>
    <Row>
      <Col xs={24} md={12}>
        <DecorativeBox>xs=24, md=12</DecorativeBox>
      </Col>
      <Col xs={24} md={12}>
        <DecorativeBox>xs=24, md=12</DecorativeBox>
      </Col>
    </Row>

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
        <DecorativeBox h={80}>Col 2</DecorativeBox>
      </Col>
      <Col xs={24} md={8}>
        <DecorativeBox>Col 3</DecorativeBox>
      </Col>
    </Row>

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

    <Divider>Complex Responsive Layout</Divider>
    <Row
      gutter={{
        xs: 8,
        md: 16
      }}
    >
      <Col xs={24} md={16}>
        <DecorativeBox h={134}>
          Main Content
          <br />
          xs=24, md=16
        </DecorativeBox>
      </Col>
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

    <Divider>Responsive Auto Span</Divider>
    <Row>
      <Col span={{ xs: 'auto', md: 8 }}>
        <DecorativeBox>xs=auto, md=8</DecorativeBox>
      </Col>
      <Col span={{ xs: 12, md: 'auto' }}>
        <DecorativeBox>xs=12, md=auto</DecorativeBox>
      </Col>
      <Col span={{ xs: 'auto', md: 'auto' }}>
        <DecorativeBox>xs=auto, md=auto</DecorativeBox>
      </Col>
    </Row>
  </Grid>
);

export default App;
