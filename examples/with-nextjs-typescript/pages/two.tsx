import React from 'react';
import Header from 'next/head';
import Layout from '../components/layout';

export default function Home() {
  return (
    <>
      <Header>
        <title>Page 2</title>
      </Header>
      <Layout activeKey="two">
        <h1> Page 2 </h1>
      </Layout>
    </>
  );
}
