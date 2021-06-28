import React from 'react';
// import {} from 'rsuite';
import Header from 'next/head';
import Layout from '../components/layout';
import 'rsuite/lib/styles/index.less';

export default function Home() {
  return (
    <>
      <Header>
        <title>HOME</title>
      </Header>
      <Layout activeKey="home">
        <h1> HOME </h1>
      </Layout>
    </>
  );
}
