'use client';

import Image from 'next/image';
import {
  Panel,
  Stack,
  Heading,
  Text,
  Button,
  ButtonToolbar,
  Badge,
  Divider
} from 'rsuite';
import { FaBook, FaGraduationCap, FaRocket, FaGithub } from 'react-icons/fa';
import Navbar from '../components/Navbar';

import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Text>
          Get started by editing{' '}
          <code className={styles.code}>src/app/page.tsx</code>
        </Text>
        <Navbar activeKey="home" />
      </div>

      <div className={styles.center}>
        <Panel
          bordered
          shaded
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            textAlign: 'center',
            padding: '40px'
          }}
        >
          <Stack direction="column" spacing={16} alignItems="center">
            <Stack spacing={20} alignItems="center">
              <Image
                src="/next.svg"
                alt="Next.js Logo"
                width={180}
                height={37}
                priority
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <Text size="xl" weight="bold" style={{ color: 'white' }}>
                +
              </Text>
              <Image
                src="/rsuite.svg"
                alt="React Suite Logo"
                width={60}
                height={60}
                priority
              />
            </Stack>
            <Heading level={1} style={{ color: 'white', margin: 0 }}>
              💖 Next.js + React Suite
            </Heading>
            <Text size="lg" style={{ color: 'rgba(255,255,255,0.9)' }}>
              Build modern web applications with App Router
            </Text>
            <Stack spacing={8}>
              <Badge content="Next.js 15" color="green" />
              <Badge content="React 19" color="blue" />
              <Badge content="React Suite 6" color="violet" />
            </Stack>
          </Stack>
        </Panel>
      </div>

      <Divider />

      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <Stack direction="column" spacing={24}>
          <Panel bordered header={<Heading level={3}>✨ Features</Heading>}>
            <Stack direction="column" spacing={12}>
              <div>🚀 <strong>Next.js 15</strong> - App Router with Server Components</div>
              <div>⚛️ <strong>React 19</strong> - Latest React with new features</div>
              <div>🎨 <strong>React Suite 6</strong> - Beautiful UI component library</div>
              <div>📦 <strong>TypeScript</strong> - Type-safe development</div>
              <div>🎯 <strong>SSR Ready</strong> - Server-side rendering support</div>
            </Stack>
          </Panel>

          <Panel bordered header={<Heading level={3}>📚 Resources</Heading>}>
            <ButtonToolbar>
              <Button
                appearance="primary"
                size="lg"
                startIcon={<FaBook />}
                href="https://nextjs.org/docs"
                as="a"
                target="_blank"
              >
                Next.js Docs
              </Button>
              <Button
                appearance="primary"
                size="lg"
                color="violet"
                startIcon={<FaGraduationCap />}
                href="https://nextjs.org/learn"
                as="a"
                target="_blank"
              >
                Learn Next.js
              </Button>
              <Button
                appearance="ghost"
                size="lg"
                startIcon={<FaRocket />}
                href="https://rsuitejs.com"
                as="a"
                target="_blank"
              >
                React Suite
              </Button>
              <Button
                appearance="subtle"
                size="lg"
                startIcon={<FaGithub />}
                href="https://github.com/rsuite/rsuite"
                as="a"
                target="_blank"
              >
                GitHub
              </Button>
            </ButtonToolbar>
          </Panel>
        </Stack>
      </div>
    </main>
  );
}
