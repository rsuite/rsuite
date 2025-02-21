<!--start-code-->

```js
import DashboardIcon from '@rsuite/icons/Dashboard';
import PeoplesIcon from '@rsuite/icons/Peoples';
import SettingIcon from '@rsuite/icons/Setting';
import PieChartIcon from '@rsuite/icons/PieChart';
import DataAuthorizeIcon from '@rsuite/icons/DataAuthorize';
import SearchIcon from '@rsuite/icons/Search';
import { Sidenav, Nav, HStack, VStack, Input, InputGroup } from 'rsuite';
import { SiProtondb } from 'react-icons/si';

const Header = ({ expanded }) => {
  if (!expanded) {
    return (
      <HStack justifyContent="center">
        <SiProtondb size={32} />
      </HStack>
    );
  }

  return (
    <VStack style={{ padding: '10px 10px 0 10px' }} spacing={12}>
      <HStack>
        <SiProtondb size={32} /> Brand
      </HStack>
      <InputGroup inside size="sm">
        <InputGroup.Addon>
          <SearchIcon />
        </InputGroup.Addon>
        <Input type="search" placeholder="Search here..." />
      </InputGroup>
    </VStack>
  );
};

const App = () => {
  const [expanded, setExpanded] = React.useState(true);
  return (
    <div style={{ width: 240 }}>
      <Sidenav expanded={expanded}>
        <Sidenav.Header>
          <Header expanded={expanded} />
        </Sidenav.Header>
        <Sidenav.Body>
          <Nav>
            <Nav.Item icon={<DashboardIcon />}>Overview</Nav.Item>
            <Nav.Item icon={<PeoplesIcon />}>Customers</Nav.Item>
            <Nav.Item icon={<PieChartIcon />}>Analytics</Nav.Item>
            <Nav.Item icon={<DataAuthorizeIcon />}>Security</Nav.Item>
            <Nav.Item icon={<SettingIcon />}>Settings</Nav.Item>
          </Nav>
        </Sidenav.Body>
        <Sidenav.Footer>
          <Sidenav.Toggle onToggle={setExpanded} />
        </Sidenav.Footer>
      </Sidenav>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
