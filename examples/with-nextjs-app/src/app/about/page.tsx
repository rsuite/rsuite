import Image from 'next/image';
import { Stack, Button } from 'rsuite';
import styles from './page.module.css';
import Navbar from '../../components/Navbar';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/about/page.tsx</code>
        </p>
        <Navbar activeKey="about" />
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <Image src="/rsuite.svg" alt="React Suite Logo" width={60} height={60} priority />
      </div>
      <Stack spacing={20}>
        <Button
          appearance="primary"
          size="lg"
          href="https://rsuitejs.com/guide/use-next-app/"
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
