import React from 'react';
import Head from 'next/head';
import { Button } from 'rsuite';
import Navbar from '../components/navbar';

import 'rsuite/lib/styles/index.less';

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
    </Head>

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
