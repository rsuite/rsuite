import React from 'react';
import { Link } from 'gatsby';
import { Panel, Button, Stack, Heading, Text } from 'rsuite';
import { FaHome } from 'react-icons/fa';
import 'rsuite/dist/rsuite.min.css';

import Layout from '../components/layout';
import SEO from '../components/seo';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <Panel bordered shaded>
        <Stack direction="column" spacing={16} alignItems="center">
          <Heading level={1} style={{ fontSize: '72px', margin: 0 }}>404</Heading>
          <Heading level={3}>Page Not Found</Heading>
          <Text muted>
            You just hit a route that doesn't exist... the sadness.
          </Text>
          <Button appearance="primary" size="lg" startIcon={<FaHome />} as={Link} to="/">
            Back to Home
          </Button>
        </Stack>
      </Panel>
    </div>
  </Layout>
);

export default NotFoundPage;
