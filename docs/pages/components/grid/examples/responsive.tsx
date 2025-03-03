/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { DecorativeBox } from '@/components/DecorativeBox';
import { Grid, Row, Col, Divider } from 'rsuite';

const App = () => (
  <Grid fluid>
    <Row>
      <Col xs={24} sm={12} md={6}>
        <DecorativeBox>
          xs={24} sm={12} md={6}
        </DecorativeBox>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <DecorativeBox>
          xs={24} sm={12} md={6}
        </DecorativeBox>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <DecorativeBox>
          xs={24} sm={12} md={6}
        </DecorativeBox>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <DecorativeBox>
          xs={24} sm={12} md={6}
        </DecorativeBox>
      </Col>
    </Row>
    <Divider />
    <Row>
      <Col xs={24} sm={12} md={8}>
        <DecorativeBox>
          xs={24} sm={12} md={8}
        </DecorativeBox>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <DecorativeBox>
          xs={24} sm={12} md={8}
        </DecorativeBox>
      </Col>
      <Col xs={24} sm={24} md={8}>
        <DecorativeBox>
          xs={24} sm={24} md={8}
        </DecorativeBox>
      </Col>
    </Row>
    <Divider />
    <Row>
      <Col xs={24} md={16}>
        <DecorativeBox>
          xs={24} md={16}
        </DecorativeBox>
      </Col>
      <Col xs={12} md={8}>
        <DecorativeBox>
          xs={12} md={8}
        </DecorativeBox>
      </Col>
      <Col xs={12} md={8}>
        <DecorativeBox>
          xs={12} md={8}
        </DecorativeBox>
      </Col>
      <Col xs={24} md={16}>
        <DecorativeBox>
          xs={24} md={16}
        </DecorativeBox>
      </Col>
    </Row>
    <Divider />
    <Row>
      {/* @ts-ignore */}
      <Col xs={24} sm={12} md={{ hidden: true }} lg={6}>
        <DecorativeBox>
          xs={24} sm={12} md={`{hidden: true}`} lg={6}
        </DecorativeBox>
      </Col>
      {/* @ts-ignore */}
      <Col xs={{ hidden: true }} sm={12} md={8} lg={6}>
        <DecorativeBox>
          xs={`{ hidden: true }`} sm={12} md={8} lg={6}
        </DecorativeBox>
      </Col>
      {/* @ts-ignore */}
      <Col xs={24} sm={{ hidden: true }} md={8} lg={6}>
        <DecorativeBox>
          xs={24} sm={`{ hidden: true }`} md={8} lg={6}
        </DecorativeBox>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <DecorativeBox>
          xs={24} sm={12} md={8}
        </DecorativeBox>
      </Col>
    </Row>
    <Divider />
    <Row>
      <Col xs={24} sm={12} md={6} lg={3}>
        <DecorativeBox>
          xs={24} sm={12} md={6} lg={3}
        </DecorativeBox>
      </Col>
      <Col xs={24} sm={12} md={6} lg={3}>
        <DecorativeBox>
          xs={24} sm={12} md={6} lg={3}
        </DecorativeBox>
      </Col>
      <Col xs={24} sm={12} md={6} lg={3}>
        <DecorativeBox>
          xs={24} sm={12} md={6} lg={3}
        </DecorativeBox>
      </Col>
      <Col xs={24} sm={12} md={6} lg={3}>
        <DecorativeBox>
          xs={24} sm={12} md={6} lg={3}
        </DecorativeBox>
      </Col>
    </Row>
  </Grid>
);

export default App;
