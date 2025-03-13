/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import React from 'react';
import {
  Container,
  Header,
  Sidebar,
  Sidenav,
  Content,
  Nav,
  Breadcrumb,
  Placeholder,
  Calendar,
  useMediaQuery
} from 'rsuite';

const App = () => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  return (
    <Container>
      <Container style={{ padding: 20 }}>
        <Header>
          <Breadcrumb>
            <Breadcrumb.Item href="#">Calendar</Breadcrumb.Item>
            <Breadcrumb.Item href="#">Schedule Manager</Breadcrumb.Item>
            <Breadcrumb.Item active>Monthly View</Breadcrumb.Item>
          </Breadcrumb>
        </Header>
        <Content>
          <Placeholder.Paragraph graph="square" rows={5} />
          <Placeholder.Paragraph graph="square" rows={5} />
          <Placeholder.Paragraph graph="square" rows={5} />
        </Content>
      </Container>
      <Sidebar
        style={{
          display: isMobile ? 'none' : 'flex',
          flexDirection: 'column',
          height: '100vh',
          gap: 10,
          borderLeft: '1px solid var(--rs-border-primary)'
        }}
        width={260}
        collapsible
      >
        <Calendar compact />
        <Sidenav appearance="subtle" style={{ flex: 1, overflowY: 'auto' }}>
          <Sidenav.Body>
            <Nav>
              <Nav.Menu eventKey="1" title="📅 My Schedules">
                <Nav.Item eventKey="1-1">Daily Tasks</Nav.Item>
                <Nav.Item eventKey="1-2">Work Projects</Nav.Item>
                <Nav.Item eventKey="1-3">Team Meetings</Nav.Item>
                <Nav.Item eventKey="1-4">Personal Goals</Nav.Item>
              </Nav.Menu>
              <Nav.Menu eventKey="2" title="✨ Special Events">
                <Nav.Item eventKey="2-1">Conferences</Nav.Item>
                <Nav.Item eventKey="2-2">Anniversaries</Nav.Item>
                <Nav.Item eventKey="2-3">Team Building</Nav.Item>
              </Nav.Menu>
              <Nav.Menu eventKey="3" title="🎯 Planning">
                <Nav.Item eventKey="3-1">Business Trips</Nav.Item>
                <Nav.Item eventKey="3-2">Project Milestones</Nav.Item>
                <Nav.Item eventKey="3-3">Training Sessions</Nav.Item>
                <Nav.Item eventKey="3-4">Review Meetings</Nav.Item>
              </Nav.Menu>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </Sidebar>
    </Container>
  );
};

export default App;
