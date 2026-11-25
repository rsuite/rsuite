import React from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Stack } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import './styles/index.css';

function HelloMessage({ name }) {
  return (
    <main className="main">
      <div className="description">
        <p>
          Get started by editing&nbsp;
          <code className="code">index.js</code>
        </p>

        <Stack spacing={12}>
          <Button appearance="subtle" as="a" href="#about">
            About
          </Button>
          <Button appearance="primary" as="a" href="https://rsuitejs.com" target="_blank" rel="noopener noreferrer">
            React Suite
          </Button>
        </Stack>
      </div>

      <div className="center">
        <div className="hero">
          <h1>{name}</h1>
          <p>A minimal Parcel + React + React Suite example</p>
        </div>
      </div>

      <div className="grid" id="about">
        <a className="card" href="https://parceljs.org/" target="_blank" rel="noopener noreferrer">
          <h2>
            Parcel <span>-&gt;</span>
          </h2>
          <p>Fast, zero-config bundler for modern web apps.</p>
        </a>

        <a className="card" href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <h2>
            React <span>-&gt;</span>
          </h2>
          <p>Build user interfaces with components.</p>
        </a>

        <a className="card" href="https://rsuitejs.com/components/overview/" target="_blank" rel="noopener noreferrer">
          <h2>
            Components <span>-&gt;</span>
          </h2>
          <p>Explore React Suite components and patterns.</p>
        </a>

        <a className="card" href="https://github.com/rsuite/rsuite" target="_blank" rel="noopener noreferrer">
          <h2>
            GitHub <span>-&gt;</span>
          </h2>
          <p>Source code, issues and contribution guide.</p>
        </a>
      </div>
    </main>
  );
}

var mountNode = document.getElementById('app');
createRoot(mountNode).render(<HelloMessage name="React Suite" />);
