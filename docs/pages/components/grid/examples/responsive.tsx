import React from 'react';
import { Grid, Row, Col, Divider } from 'rsuite';
import { Box } from '@/mock-components/Box';

const App = () => (
  <Grid fluid>
    <Row>
      <Col xs={24} sm={12} md={6}>
        <Box>
          xs={24} sm={12} md={6}
        </Box>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Box>
          xs={24} sm={12} md={6}
        </Box>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Box>
          xs={24} sm={12} md={6}
        </Box>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Box>
          xs={24} sm={12} md={6}
        </Box>
      </Col>
    </Row>
    <Divider />
    <Row>
      <Col xs={24} sm={12} md={8}>
        <Box>
          xs={24} sm={12} md={8}
        </Box>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Box>
          xs={24} sm={12} md={8}
        </Box>
      </Col>
      <Col xs={24} sm={24} md={8}>
        <Box>
          xs={24} sm={24} md={8}
        </Box>
      </Col>
    </Row>
    <Divider />
    <Row>
      <Col xs={24} md={16}>
        <Box>
          xs={24} md={16}
        </Box>
      </Col>
      <Col xs={12} md={8}>
        <Box>
          xs={12} md={8}
        </Box>
      </Col>
      <Col xs={12} md={8}>
        <Box>
          xs={12} md={8}
        </Box>
      </Col>
      <Col xs={24} md={16}>
        <Box>
          xs={24} md={16}
        </Box>
      </Col>
    </Row>
    <Divider />
    <Row>
      <Col xs={24} sm={12} mdHidden lg={6}>
        <Box>
          xs={24} sm={12} mdHidden lg={6}
        </Box>
      </Col>
      <Col xsHidden sm={12} md={8} lg={6}>
        <Box>
          xsHidden sm={12} md={8} lg={6}
        </Box>
      </Col>
      <Col xs={24} smHidden md={8} lg={6}>
        <Box>
          xs={24} smHidden md={8} lg={6}
        </Box>
      </Col>
      <Col xs={24} sm={12} md={8} lgHidden>
        <Box>
          xs={24} sm={12} md={8} lgHidden
        </Box>
      </Col>
    </Row>
    <Divider />
    <Row>
      <Col xs={24} sm={12} md={6} lg={3}>
        <Box>
          xs={24} sm={12} md={6} lg={3}
        </Box>
      </Col>
      <Col xs={24} sm={12} md={6} lg={3}>
        <Box>
          xs={24} sm={12} md={6} lg={3}
        </Box>
      </Col>
      <Col xs={24} sm={12} md={6} lg={3}>
        <Box>
          xs={24} sm={12} md={6} lg={3}
        </Box>
      </Col>
      <Col xs={24} sm={12} md={6} lg={3}>
        <Box>
          xs={24} sm={12} md={6} lg={3}
        </Box>
      </Col>
    </Row>
  </Grid>
);

export default App;
