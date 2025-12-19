import * as React from 'react';
import { Grid, Row, Col, Nav, Stack, Panel, Button } from 'rsuite';

export interface HelloProps {
  compiler: string;
  framework: string;
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<HelloProps, Record<string, never>> {
  render() {
    return (
      <Grid style={{ padding: 20 }}>
        <Row>
          <Col xs={24}>
            <Stack justifyContent="space-between" alignItems="center" wrap>
              <p style={{ margin: 0 }}>
                Get started by editing&nbsp;
                <code>src/components/Hello.tsx</code>
              </p>

              <Nav>
                <Nav.Item active>Home</Nav.Item>
                <Nav.Item href="https://rsuitejs.com" target="_blank" rel="noopener noreferrer">
                  RSuite
                </Nav.Item>
              </Nav>
            </Stack>
          </Col>
        </Row>

        <Row style={{ marginTop: 40, marginBottom: 40 }}>
          <Col xs={24}>
            <Stack direction="column" alignItems="center" spacing={12}>
              <h2 style={{ margin: 0 }}>React Suite + {this.props.framework}</h2>
              <p style={{ margin: 0, opacity: 0.8 }}>Powered by {this.props.compiler}</p>
              <Stack spacing={12}>
                <Button
                  appearance="primary"
                  size="lg"
                  href="https://rsuitejs.com/guide/introduction/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Getting started
                </Button>
                <Button
                  size="lg"
                  href="https://rsuitejs.com/components/overview/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Components
                </Button>
              </Stack>
            </Stack>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <a
              href="https://rsuitejs.com/components/overview/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              <Panel bordered header={<strong>Components -&gt;</strong>} style={{ height: '100%' }}>
                Explore React Suite&apos;s rich set of components.
              </Panel>
            </a>
          </Col>
          <Col xs={24} md={12}>
            <a
              href="https://rsuitejs.com/guide/introduction/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              <Panel bordered header={<strong>Docs -&gt;</strong>} style={{ height: '100%' }}>
                Find in-depth information about React Suite usage and patterns.
              </Panel>
            </a>
          </Col>
        </Row>
      </Grid>
    );
  }
}
