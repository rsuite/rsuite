<!--start-code-->

```js
import { Splitter, Box, Text, Table } from 'rsuite';

const files = [
  { name: 'Dashboard.tsx', kind: 'Component', updated: 'Today' },
  { name: 'Navigation.tsx', kind: 'Component', updated: 'Today' },
  { name: 'settings.json', kind: 'Configuration', updated: 'Yesterday' }
];

const App = () => (
  <Splitter defaultSizes={[20, 55, 25]} style={{ height: 280 }}>
    <Splitter.Panel minSize={15} maxSize={30} aria-label="Projects">
      <Box p={12}>
        <Text weight="bold">Projects</Text>
        <ul>
          <li>Console</li>
          <li>Reports</li>
          <li>Settings</li>
        </ul>
      </Box>
    </Splitter.Panel>
    <Splitter.Panel minSize={30} aria-label="Files">
      <Table data={files} height={280}>
        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.Cell dataKey="name" />
        </Table.Column>
        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Kind</Table.HeaderCell>
          <Table.Cell dataKey="kind" />
        </Table.Column>
        <Table.Column width={100}>
          <Table.HeaderCell>Updated</Table.HeaderCell>
          <Table.Cell dataKey="updated" />
        </Table.Column>
      </Table>
    </Splitter.Panel>
    <Splitter.Panel minSize={15} maxSize={40} aria-label="Inspector">
      <Box p={12}>
        <Text weight="bold">Inspector</Text>
        <Text>Select a file to inspect its details.</Text>
      </Box>
    </Splitter.Panel>
  </Splitter>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
