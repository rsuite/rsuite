import React from 'react';
import { Link } from '@remix-run/react';
import { Button, List } from 'rsuite';

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix With RSuite</h1>
      <List>
        <List.Item>
          <Button as={Link} to="/rsuite" appearance="link">
            RSuite
          </Button>
        </List.Item>
        <List.Item>
          <Button
            appearance="link"
            as="a"
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </Button>
        </List.Item>
        <List.Item>
          <Button
            appearance="link"
            as="a"
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </Button>
        </List.Item>
        <List.Item>
          <Button
            appearance="link"
            as="a"
            target="_blank"
            href="https://remix.run/docs"
            rel="noreferrer"
          >
            Remix Docs
          </Button>
        </List.Item>
      </List>
    </div>
  );
}
