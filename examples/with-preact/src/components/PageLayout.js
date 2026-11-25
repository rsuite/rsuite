import React from 'react';
import { Nav } from 'rsuite';
import { Link } from 'preact-router/match';
import styles from './PageLayout.module.css';

const PageLayout = ({ activeKey, codePath, title, subtitle, cards, children }) => {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>{codePath}</code>
        </p>

        <Nav>
          <Nav.Item as={Link} href="/" active={activeKey === 'home'}>
            Home
          </Nav.Item>
          <Nav.Item as={Link} href="/profile/me" active={activeKey === 'profile'}>
            Profile
          </Nav.Item>
        </Nav>
      </div>

      <div className={styles.center}>
        <div className={styles.brand}>
          <div className={styles['brand-row']}>
            <span className={styles['brand-text']}>Preact</span>
            <span className={styles['brand-plus']}>+</span>
            <span className={styles['brand-text']}>React Suite</span>
          </div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>

      {children ? <div className={styles.content}>{children}</div> : null}

      {cards?.length ? (
        <div className={styles.grid}>
          {cards.map(card => (
            <a
              key={card.href}
              href={card.href}
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2>
                {card.title} <span>-&gt;</span>
              </h2>
              <p>{card.description}</p>
            </a>
          ))}
        </div>
      ) : null}
    </main>
  );
};

export default PageLayout;
