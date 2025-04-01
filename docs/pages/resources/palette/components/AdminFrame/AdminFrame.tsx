import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import {
  ButtonToolbar,
  Button,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio,
  Toggle,
  Slider,
  Input,
  Loader,
  Container,
  Sidebar,
  Sidenav,
  Content,
  Nav,
  IconButton,
  Stack,
  Panel,
  Steps,
  Divider,
  RadioTileGroup,
  RadioTile,
  DatePicker,
  HStack
} from 'rsuite';
import Icon from '@rsuite/icons/Icon';
import {
  MdDashboard,
  MdGroup,
  MdOutlineStackedBarChart,
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight
} from 'react-icons/md';
import { VscLock, VscWorkspaceTrusted, VscRepo } from 'react-icons/vsc';
import Link from 'next/link';
import Logo from '@/components/Logo';
import Header from './Header';

const Brand = ({ expand, ...rest }) => {
  return (
    <Stack className="brand" {...rest}>
      <Logo height={26} style={{ marginTop: 6 }} />
      {expand && (
        <Link href="/">
          <span style={{ marginLeft: 14 }}>Admin Template</span>
        </Link>
      )}
    </Stack>
  );
};

const NavToggle = ({ expand, onChange }) => {
  return (
    <Stack className="nav-toggle" justifyContent={expand ? 'flex-end' : 'center'}>
      <IconButton
        onClick={onChange}
        appearance="subtle"
        size="lg"
        icon={expand ? <MdKeyboardArrowLeft /> : <MdOutlineKeyboardArrowRight />}
      />
    </Stack>
  );
};

interface AdminFrameProps {
  loading: boolean;
}

function AdminFrame(props: AdminFrameProps) {
  const { loading } = props;
  const [expand, setExpand] = useState(false);
  const rootRef = useRef();

  const containerClasses = classNames('page-container', {
    'container-full': !expand
  });

  return (
    <Container className="rs-admin-frame" ref={rootRef}>
      <Sidebar
        style={{ display: 'flex', flexDirection: 'column' }}
        width={expand ? 260 : 56}
        collapsible
      >
        <Sidenav.Header>
          <Brand expand={expand} />
        </Sidenav.Header>
        <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle">
          <Sidenav.Body>
            <Nav defaultActiveKey="1">
              <Nav.Item eventKey="1" icon={<Icon as={MdDashboard} />}>
                Overview
              </Nav.Item>
              <Nav.Item eventKey="2" icon={<Icon as={MdGroup} />}>
                User Group
              </Nav.Item>
              <Nav.Menu
                eventKey="3"
                trigger="hover"
                title="Advanced"
                icon={<Icon as={MdOutlineStackedBarChart} />}
                placement="rightStart"
              >
                <Nav.Item eventKey="3-1">Geo</Nav.Item>
                <Nav.Item eventKey="3-2">Devices</Nav.Item>
                <Nav.Item eventKey="3-3">Brand</Nav.Item>
                <Nav.Item eventKey="3-4">Loyalty</Nav.Item>
                <Nav.Item eventKey="3-5">Visit Depth</Nav.Item>
              </Nav.Menu>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
        <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
      </Sidebar>

      <Container className={containerClasses}>
        <Header />
        <Content>
          <Panel header="Overview">
            {loading && <Loader content="Downloading Less.js" />}

            <Panel className="rs-card">
              <Steps current={0}>
                <Steps.Item title="Project Type" />
                <Steps.Item title="Project Info" />
                <Steps.Item title="Team settings" />
              </Steps>
              <Divider />
              <CheckboxGroup name="check" defaultValue={['1', '2']} inline>
                <Checkbox value="1">Owner</Checkbox>
                <Checkbox value="2">Admin</Checkbox>
                <Checkbox value="3">Member</Checkbox>
              </CheckboxGroup>
              <Divider />
              <HStack spacing={30}>
                <RadioGroup name="radio" defaultValue="1" inline>
                  <Radio value="1">Public</Radio>
                  <Radio value="2">Private</Radio>
                </RadioGroup>
                <Toggle defaultChecked>Flight mode</Toggle>
              </HStack>

              <Divider />
              <HStack>
                <DatePicker container={() => rootRef.current} /> <Input />
              </HStack>
              <Divider />

              <Divider />
              <Slider progress defaultValue={50} />
              <Divider />
              <RadioTileGroup defaultValue="private" aria-label="Visibility Level">
                <RadioTile icon={<Icon as={VscLock} />} label="Private" value="private">
                  Project access must be granted explicitly to each user. If this project is part of
                  a group, access will be granted to members of the group.
                </RadioTile>
                <RadioTile
                  icon={<Icon as={VscWorkspaceTrusted} />}
                  label="Internal"
                  value="internal"
                >
                  The project can be accessed by any logged in user except external users.
                </RadioTile>

                <RadioTile icon={<Icon as={VscRepo} />} label="Public" value="public">
                  The project can be accessed without any authentication.
                </RadioTile>
              </RadioTileGroup>
              <Divider />
              <ButtonToolbar>
                <Button appearance="default">Default</Button>
                <Button appearance="primary">Primary</Button>
                <Button appearance="link">Link</Button>
                <Button appearance="ghost">Ghost</Button>
              </ButtonToolbar>
            </Panel>
          </Panel>
        </Content>
      </Container>
    </Container>
  );
}

export default AdminFrame;
