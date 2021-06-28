import React from 'react';
import Header from 'next/head';
import Layout from '../components/layout';
import 'rsuite/lib/styles/index.less';

export default function Home() {
  return (
    <>
      <Header>
        <title>ONE</title>
      </Header>
      <Layout activeKey="one">
        <h1> ONE </h1>
      </Layout>
    </>
  );
}