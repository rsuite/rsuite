import * as React from 'react';
import {
  Container,
  Header,
  Footer,
  Sidebar,
  Content,
  Button,
  Divider,
  Sidenav,
  Nav,
  Icon,
  IconButton,
  Toggle,
  Dropdown,
  FlexboxGrid,
  Panel,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  ButtonToolbar,
  Navbar
} from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';
import Logo from '@/components/Logo';


export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Container"
        examples={['basic', 'sidebar-page', 'navbar-page', 'login-page']}
        dependencies={{
          Logo,
          Divider,
          Icon,
          IconButton,
          Button,
          Container,
          Header,
          Footer,
          Sidebar,
          Content,
          Sidenav,
          Nav,
          Toggle,
          Dropdown,
          FlexboxGrid,
          Panel,
          Form,
          FormGroup,
          ControlLabel,
          FormControl,
          ButtonToolbar,
          Navbar
        }}
      />
    </Frame>
  );
}
