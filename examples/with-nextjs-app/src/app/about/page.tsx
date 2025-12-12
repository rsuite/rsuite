'use client';

import Image from 'next/image';
import { Panel, Stack, Button, Heading, Text, List, Divider } from 'rsuite';
import { FaRocket, FaBook } from 'react-icons/fa';
import styles from './page.module.css';
import Navbar from '../../components/Navbar';

export default function About() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Text>
          Get started by editing{' '}
          <code className={styles.code}>src/app/about/page.tsx</code>
        </Text>
        <Navbar activeKey="about" />
      </div>

      <div className={styles.center}>
        <Stack spacing={20} alignItems="center">
          <Image
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <Text size="xl" weight="bold">+</Text>
          <Image src="/rsuite.svg" alt="React Suite Logo" width={60} height={60} priority />
        </Stack>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <Stack direction="column" spacing={24}>
          <Panel bordered shaded header={<Heading level={2}>About This Example</Heading>}>
            <Stack direction="column" spacing={16}>
              <Text>
                This is a Next.js application using the App Router with React Suite components.
                It demonstrates how to integrate React Suite with Next.js 15 and React 19.
              </Text>

              <Divider />

              <Heading level={4}>Key Features</Heading>
              <List>
                <List.Item>
                  <strong>Next.js 15</strong> - Latest version with App Router
                </List.Item>
                <List.Item>
                  <strong>React 19</strong> - Cutting-edge React features
                </List.Item>
                <List.Item>
                  <strong>React Suite 6</strong> - Modern UI component library
                </List.Item>
                <List.Item>
                  <strong>TypeScript</strong> - Full type safety
                </List.Item>
                <List.Item>
                  <strong>Server Components</strong> - Optimized performance
                </List.Item>
              </List>
            </Stack>
          </Panel>

          <Panel bordered header={<Heading level={4}>Learn More</Heading>}>
            <Stack spacing={12}>
              <Button
                appearance="primary"
                size="lg"
                startIcon={<FaRocket />}
                href="https://rsuitejs.com/guide/use-next-app/"
                as="a"
                target="_blank"
              >
                Getting Started
              </Button>
              <Button
                appearance="ghost"
                size="lg"
                startIcon={<FaBook />}
                href="https://rsuitejs.com/components/overview/"
                as="a"
                target="_blank"
              >
                Components
              </Button>
            </Stack>
          </Panel>
        </Stack>
      </div>
    </main>
  );
}
