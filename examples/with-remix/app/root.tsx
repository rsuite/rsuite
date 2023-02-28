import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import styles from 'rsuite/dist/rsuite.css';
import sharedStyle from '~/styles/shared.css';
import navbarStyle from '~/styles/navbar.css';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App With RSuite',
  viewport: 'width=device-width,initial-scale=1'
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function links() {
  return [
    { rel: 'stylesheet', href: styles },
    {
      rel: 'stylesheet',
      href: sharedStyle
    },
    {
      rel: 'stylesheet',
      href: navbarStyle
    }
  ];
}
