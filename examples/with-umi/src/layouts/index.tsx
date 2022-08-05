import React, { useState } from 'react';
import { Container, Content, Nav, Sidebar, Sidenav } from 'rsuite';
import { Link, Outlet } from 'umi';

import style from './index.less';

export default function Layout() {
  const [activeKey, setActiveKey] = useState('1');
  return (
    <Container>
      <Sidebar>
        <Sidenav>
          <Sidenav.Body className={style.sidenavBody}>
            <Nav activeKey={activeKey} onSelect={setActiveKey}>
              <Nav.Item eventKey="1" as={Link} to="/">
                Home
              </Nav.Item>
              <Nav.Item eventKey="2" as={Link} to="/docs">
                Docs
              </Nav.Item>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </Sidebar>
      <div className={style.pageContent}>
        <Container>
          <Content>
            <Outlet />
          </Content>
        </Container>
      </div>
    </Container>
  );
}
