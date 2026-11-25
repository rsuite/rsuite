import React from 'react';
import PageLayout from '../../components/PageLayout';

// Note: `user` comes from the URL, courtesy of our router
const Profile = ({ user }) => {
  const cards = [
    {
      title: 'Docs',
      href: 'https://rsuitejs.com/guide/introduction/',
      description: 'Find in-depth information about RSuite.'
    },
    {
      title: 'Components',
      href: 'https://rsuitejs.com/components/overview/',
      description: 'Browse all components and examples.'
    },
    {
      title: 'Preact',
      href: 'https://preactjs.com/',
      description: 'Fast 3kB alternative to React with the same modern API.'
    },
    {
      title: 'Vite',
      href: 'https://vite.dev/guide/',
      description: 'Get the most out of Vite with Preact.'
    }
  ];

  return (
    <PageLayout
      activeKey="profile"
      codePath="src/routes/profile/index.js"
      title={`Profile: ${user}`}
      subtitle="A simple client-side page with RSuite components"
      cards={cards}
    />
  );
};

export default Profile;
