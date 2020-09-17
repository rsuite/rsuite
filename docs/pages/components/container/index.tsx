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

import DefaultPage from '@/components/Page';
import Logo from '@/components/Logo';

export default function Page() {
  return (
    <DefaultPage
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
  );
}
