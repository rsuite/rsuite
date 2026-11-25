<!--start-code-->

```js
import { Table } from 'rsuite';
import { mockUsers } from './mock';

const { Column, HeaderCell, Cell } = Table;
const data = mockUsers(20);

const CompactCell = props => <Cell {...props} style={{ padding: 6 }} />;

const App = () => {
  return (
    <div>
      <Table height={400} data={data} bordered cellBordered rowHeight={34}>
        <Column width={120} fixed fullText>
          <HeaderCell>Name</HeaderCell>
          <CompactCell dataKey="name" />
        </Column>

        <Column width={200} fullText>
          <HeaderCell>Url</HeaderCell>
          <CompactCell dataKey="avatar" />
        </Column>

        <Column width={130} fullText>
          <HeaderCell>Company</HeaderCell>
          <CompactCell dataKey="company" />
        </Column>

        <Column width={130} fullText>
          <HeaderCell>Email</HeaderCell>
          <CompactCell dataKey="email" />
        </Column>

        <Column width={130} fullText>
          <HeaderCell>City</HeaderCell>
          <CompactCell dataKey="city" />
        </Column>

        <Column width={130} fullText>
          <HeaderCell>Street</HeaderCell>
          <CompactCell dataKey="street" />
        </Column>
      </Table>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
