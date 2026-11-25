import React from 'react';
import { Nav } from 'rsuite';
import { HashRouter, Link, Route, Routes, useLocation } from 'react-router-dom';

// eslint-disable-next-line react/display-name
const NavLink = React.forwardRef((props, ref) => {
  const location = useLocation();
  return (
    <Nav.Item
      {...props}
      ref={ref}
      active={props.activeKey ? props.to === props.activeKey : props.to === location.pathname}
      as={Link}
    />
  );
});

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PageLayout activeKey="/" codePath="src/App.js">
              <Home />
            </PageLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PageLayout activeKey="/about" codePath="src/App.js">
              <About />
            </PageLayout>
          }
        />
        <Route
          path="/users"
          element={
            <PageLayout activeKey="/users" codePath="src/App.js">
              <Users />
            </PageLayout>
          }
        />
      </Routes>
    </HashRouter>
  );
}

function PageLayout({ activeKey, codePath, children }) {
  const cards = [
    {
      title: 'Docs',
      href: 'https://reactrouter.com/en/main',
      description: 'Find in-depth information about React Router.'
    },
    {
      title: 'RSuite',
      href: 'https://rsuitejs.com/',
      description: 'A suite of React components for building enterprise web apps.'
    },
    {
      title: 'Components',
      href: 'https://rsuitejs.com/components/overview/',
      description: 'Explore all RSuite components and examples.'
    },
    {
      title: 'GitHub',
      href: 'https://github.com/rsuite/rsuite',
      description: 'Source code, issues and contribution guide.'
    }
  ];

  return (
    <main className="page-main">
      <div className="page-description">
        <p>
          Get started by editing&nbsp;
          <code className="page-code">{codePath}</code>
        </p>
        <Nav>
          <NavLink to="/" activeKey={activeKey}>
            Home
          </NavLink>
          <NavLink to="/about" activeKey={activeKey}>
            About
          </NavLink>
          <NavLink to="/users" activeKey={activeKey}>
            Users
          </NavLink>
        </Nav>
      </div>

      <div className="page-center">
        <div className="page-brand">
          <h1 className="page-title">React Router + React Suite</h1>
          <p className="page-subtitle">A minimal example using React Router v6 with RSuite components</p>
        </div>
      </div>

      <div style={{ maxWidth: 'var(--max-width)', width: '100%' }}>{children}</div>

      <div className="page-grid">
        {cards.map(card => (
          <a key={card.href} className="page-card" href={card.href} target="_blank" rel="noopener noreferrer">
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

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
