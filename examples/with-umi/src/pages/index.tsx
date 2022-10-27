import React from 'react';
import { Container, Content, Header } from 'rsuite';

import yayJpg from '../assets/yay.jpg';

export default function HomePage() {
  return (
    <Container>
      <Header>
        <h2>Home</h2>
      </Header>
      <Content>
        <img src={yayJpg} />
      </Content>
    </Container>
  );
}
