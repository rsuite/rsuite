import React from 'react';
import { Link } from 'gatsby';
import {
  Button,
  ButtonToolbar,
  Panel,
  Stack,
  Heading,
  Text,
  Badge,
  Divider,
} from 'rsuite';
import { FaGithub, FaBook, FaRocket } from 'react-icons/fa';
import 'rsuite/dist/rsuite.min.css';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Stack direction="column" spacing={24}>
        {/* Hero Section */}
        <Panel
          bordered
          shaded
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Stack direction="column" spacing={16}>
            <Heading level={1} style={{ color: 'white', margin: 0 }}>
              💖 React Suite + Gatsby
            </Heading>
            <Text size="lg" style={{ color: 'rgba(255,255,255,0.9)' }}>
              Build blazing fast static sites with React Suite components
            </Text>
            <Badge content="v6.1.0" color="green" />
          </Stack>
        </Panel>

        {/* Description */}
        <Panel bordered header={<Heading level={4}>About React Suite</Heading>}>
          <Text>
            A suite of React components, intimate UI design, and a friendly development
            experience. Build enterprise-class web applications with ease.
          </Text>
        </Panel>

        {/* Features */}
        <Panel bordered header={<Heading level={4}>Features</Heading>}>
          <Stack direction="column" spacing={12}>
            <div>🎨 Rich UI Components - Buttons, Forms, Tables, and more</div>
            <div>⚡ SSR Support - Perfect for Gatsby static sites</div>
            <div>📦 TypeScript Ready - Full type definitions included</div>
            <div>🌐 Internationalization - Multi-language support</div>
            <div>📱 Responsive Design - Works on all devices</div>
          </Stack>
        </Panel>

        {/* Image */}
        <div style={{ maxWidth: '300px', margin: '0 auto' }}>
          <Image />
        </div>

        <Divider />

        {/* Actions */}
        <Panel bordered header={<Heading level={4}>Get Started</Heading>}>
          <ButtonToolbar>
            <Button appearance="primary" size="lg" startIcon={<FaRocket />}>
              Getting Started
            </Button>
            <Button
              appearance="ghost"
              size="lg"
              startIcon={<FaBook />}
              href="https://rsuitejs.com"
              target="_blank"
            >
              Documentation
            </Button>
            <Button
              appearance="subtle"
              size="lg"
              startIcon={<FaGithub />}
              href="https://github.com/rsuite/rsuite"
              target="_blank"
            >
              GitHub
            </Button>
          </ButtonToolbar>
        </Panel>

        {/* Navigation */}
        <Panel bordered>
          <Button appearance="link" as={Link} to="/components-demo/">
            View Components Demo →
          </Button>
        </Panel>
      </Stack>
    </div>
  </Layout>
);

export default IndexPage;
