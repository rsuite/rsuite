<!--start-code-->

```js
import { Panel, Table } from 'rsuite';

const { HeaderCell, Cell, Column } = Table;

const createRowData = rowIndex => {
  const randomKey = Math.floor(Math.random() * 9);
  const names = ['Hal', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert', 'Hazel'];
  const citys = [
    'Beijing',
    'Shanghai',
    'New Amieshire',
    'New Gust',
    'Lefflerstad',
    'East Catalina',
    'Ritchieborough',
    'Gilberthaven',
    'Eulaliabury'
  ];
  const emails = [
    'yahoo.com',
    'gmail.com',
    'hotmail.com',
    'outlook.com',
    'aol.com',
    'live.com',
    'msn.com',
    'yandex.com',
    'mail.ru'
  ];

  return {
    id: rowIndex + 1,
    name: names[randomKey],
    city: citys[randomKey],
    email: names[randomKey].toLocaleLowerCase() + '@' + emails[randomKey]
  };
};

const data = Array.from({ length: 20 }).map((_, index) => createRowData(index));

const App = () => (
  <Panel header="User List" bordered bodyFill>
    <Table height={400} data={data}>
      <Column width={70} align="center" fixed>
        <HeaderCell>Id</HeaderCell>
        <Cell dataKey="id" />
      </Column>

      <Column width={200} fixed>
        <HeaderCell>Name</HeaderCell>
        <Cell dataKey="name" />
      </Column>

      <Column width={200}>
        <HeaderCell>City</HeaderCell>
        <Cell dataKey="city" />
      </Column>

      <Column width={300}>
        <HeaderCell>Email</HeaderCell>
        <Cell dataKey="email" />
      </Column>
    </Table>
  </Panel>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
