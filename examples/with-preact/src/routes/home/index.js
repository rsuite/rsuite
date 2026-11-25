import React from 'react';
import PageLayout from '../../components/PageLayout';

const Home = () => {
  const cards = [
    {
      title: 'RSuite Docs',
      href: 'https://rsuitejs.com/guide/introduction/',
      description: 'Learn about React Suite features and API.'
    },
    {
      title: 'Components',
      href: 'https://rsuitejs.com/components/overview/',
      description: 'Explore RSuite components and patterns.'
    },
    {
      title: 'Vite',
      href: 'https://vite.dev/guide/',
      description: 'Fast build tool and dev server for modern web apps.'
    },
    {
      title: 'GitHub',
      href: 'https://github.com/rsuite/rsuite',
      description: 'Source code, issues and contribution guide.'
    }
  ];

  return (
    <PageLayout
      activeKey="home"
      codePath="src/routes/home/index.js"
      title="Create Preact App"
      subtitle="Vite + Preact (compat) + React Suite"
      cards={cards}
    />
  );
};

export default Home;
