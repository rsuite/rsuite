import React from 'react';
import { Stack, Button } from 'rsuite';
import Navbar from '../components/Navbar';
import Logos from '../components/Logos';
import styles from './about.module.css';

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/pages/about.tsx</code>
        </p>
        <Navbar />
      </div>

      <div className={styles.center}>
        <Logos />
      </div>

      <Stack spacing={20}>
        <Button
          appearance="primary"
          size="lg"
          href="https://umijs.org/docs/guides/getting-started"
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
    </main>
  );
}
