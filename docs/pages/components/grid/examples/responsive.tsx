import React from 'react';
import { Grid, Row, Col, Divider } from 'rsuite';

const App = () => (
  <Grid fluid>
    <Row className="show-grid">
      <Col xs={24} sm={24} md={8}>
        xs={24} sm={24} md={8}
      </Col>
      <Col xs={24} sm={24} md={8}>
        xs={24} sm={24} md={8}
      </Col>
      <Col xs={24} sm={24} md={8}>
        xs={24} sm={24} md={8}
      </Col>
    </Row>
    <Divider />
    <Row className="show-grid">
      <Col xs={24} md={24} lg={12}>
        xs={24} md={24} lg={12}
      </Col>
      <Col xs={24} md={12} lg={6}>
        xs={24} md={12} lg={6}
      </Col>
      <Col xs={24} md={12} lg={6}>
        xs={24} md={12} lg={6}
      </Col>
    </Row>
    <Divider />
    <Row className="show-grid">
      <Col xs={24} md={12} lg={6}>
        xs={24} md={12} lg={6}
      </Col>
      <Col xs={24} md={12} lg={6}>
        xs={24} md={12} lg={6}
      </Col>
      <Col xs={24} md={12} lg={6}>
        xs={24} md={12} lg={6}
      </Col>
      <Col xs={24} md={12} lg={6}>
        xs={24} md={12} lg={6}
      </Col>
    </Row>
    <Divider />
    <Row className="show-grid">
      <Col xsHidden md={12}>
        xsHidden md={12}
      </Col>
      <Col xs={24} md={12}>
        xs={24} md={12}
      </Col>
    </Row>
  </Grid>
);

export default App;
