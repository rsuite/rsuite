import React from 'react';
import { Link } from 'umi';
import Navbar from '../components/Navbar';
import Logos from '../components/Logos';
import styles from './index.module.css';

const HomePage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/pages/index.tsx</code>
        </p>

        <Navbar />
      </div>

      <div className={styles.center}>
        <Logos />
      </div>

      <div className={styles.grid}>
        <a
          href="https://umijs.org/"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Umi features and API.</p>
        </a>

        <a
          href="https://umijs.org/docs/guides/getting-started"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Umi in a guided tutorial.</p>
        </a>

        <a
          href="https://rsuitejs.com/guide/introduction/"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            RSuite <span>-&gt;</span>
          </h2>
          <p>Explore RSuite components and integration guides.</p>
        </a>

        <Link to="/about" className={styles.card}>
          <h2>
            About <span>-&gt;</span>
          </h2>
          <p>See the About page for more RSuite examples.</p>
        </Link>
      </div>
    </main>
  );
};

export default HomePage;
