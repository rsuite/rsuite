<!--start-code-->

```js
import { Dropdown } from 'rsuite';
import { PlacementCornerGrid } from '@/components/PlacementGrid';

const items = [
  <Dropdown.Item key={1}>New File</Dropdown.Item>,
  <Dropdown.Item key={2}>New File with Current Profile</Dropdown.Item>,
  <Dropdown.Item key={3}>Download As...</Dropdown.Item>,
  <Dropdown.Item key={4}>Export PDF</Dropdown.Item>,
  <Dropdown.Item key={5}>Export HTML</Dropdown.Item>,
  <Dropdown.Item key={6}>Settings</Dropdown.Item>,
  <Dropdown.Item key={7}>About</Dropdown.Item>
];

const App = () => (
  <PlacementCornerGrid
    renderCell={({ placement, button, icon, key }) => (
      <Dropdown
        key={key}
        placement={placement}
        noCaret
        icon={icon}
        aria-label={`Menu pops up from ${placement}`}
      >
        {items}
      </Dropdown>
    )}
  />
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
