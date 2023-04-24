import React from 'react';
import { Button } from 'rsuite';
import { Navbar } from '~/components/Navbar';
import style from '~/styles/index.css';

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <div className="hero">
        <h1 className="title">Welcome to React Suite</h1>
        <p className="description">
          A suite of React components, intimate UI design, and a friendly development experience.
        </p>
        <hr />
        <Navbar />
        <hr />
        <Button appearance="primary" href="https://rsuitejs.com/">
          Getting started
        </Button>
      </div>
    </div>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: style }];
}
