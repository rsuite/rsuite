import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button, Nav } from 'rsuite';
import 'rsuite/styles/less/index.less';

const NavLink = React.forwardRef((props, ref) => {
  const { as, href, ...rest } = props;
  return (
    <Link href={href} as={as}>
      <a ref={ref} {...rest} />
    </Link>
  );
});

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
    </Head>

    <div className="hero">
      <h1 className="title">Welcome to React Suite</h1>
      <p className="description">
        A suite of React components, intimate UI design, and a friendly development experience.
        <br />
      </p>
      <hr></hr>
      <Nav>
        <Nav.Item componentClass={NavLink} href="/page1">
          Page 1
        </Nav.Item>
        <Nav.Item componentClass={NavLink} href="/page2">
          Page 2
        </Nav.Item>
      </Nav>
      <hr></hr>
      <Button appearance="primary" href="https://rsuitejs.com/">
        Getting started
      </Button>
    </div>

    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
        padding: 50px;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
    `}</style>
  </div>
);

export default Home;
