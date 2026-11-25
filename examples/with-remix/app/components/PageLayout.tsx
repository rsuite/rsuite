import React from "react";
import { Navbar } from "./Navbar";
import styles from "./PageLayout.module.css";

export type PageLayoutCard = {
  href: string;
  title: string;
  description: string;
};

export function PageLayout(props: {
  codePath: string;
  children?: React.ReactNode;
  cards: PageLayoutCard[];
}) {
  const { codePath, children, cards } = props;

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>{codePath}</code>
        </p>
        <Navbar />
      </div>

      <div className={styles.center}>{children}</div>

      <div className={styles.grid}>
        {cards.map(card => (
          <a key={card.href} href={card.href} className={styles.card} target="_blank" rel="noopener noreferrer">
            <h2>
              {card.title} <span>-&gt;</span>
            </h2>
            <p>{card.description}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
