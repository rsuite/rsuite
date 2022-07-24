<!--start-code-->

```js
import { Table } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;
const data = [
  {
    id: 1,
    email: 'Leora13@yahoo.com',
    firstName:
      'Red Wacky League AntlezBroketheStereoNeon Kitching Josh Bennett Evolution Dreams 红色古怪联盟丹尼尔梅斯马修',
    lastName: 'Schuppe',
    city: 'New Gust',
    companyName: 'Lebsack - Nicolas'
  },
  {
    id: 2,
    email: 'Mose_Gerhold51@yahoo.com',
    firstName: 'Janis',
    lastName: 'Bode',
    city: 'New Gust',
    companyName: 'Glover - Hermiston'
  },
  {
    id: 3,
    city: 'New Gust',
    email: 'Frieda.Sauer61@gmail.com',
    firstName: 'Makenzie Vandervort',
    lastName: null,
    companyName: 'Williamson - Kassulke'
  },
  {
    id: 4,
    email: 'Eloisa.OHara@hotmail.com',
    firstName: 'Ciara',
    lastName: 'Towne',
    city: 'Vandervort',
    companyName: 'Hilpert, Eichmann and Brown'
  }
];

const App = () => {
  return (
    <Table
      wordWrap="break-word"
      height={400}
      data={data}
      onRowClick={data => {
        console.log(data);
      }}
    >
      <Column width={70} align="center" fixed>
        <HeaderCell>Id</HeaderCell>
        <Cell dataKey="id" />
      </Column>

      <Column width={130} fixed>
        <HeaderCell>First Name</HeaderCell>
        <Cell dataKey="firstName" />
      </Column>

      <Column width={130}>
        <HeaderCell>Last Name</HeaderCell>
        <Cell dataKey="lastName" />
      </Column>

      <Column width={200}>
        <HeaderCell>City</HeaderCell>
        <Cell dataKey="city" />
      </Column>

      <Column width={200}>
        <HeaderCell>Company Name</HeaderCell>
        <Cell dataKey="companyName" />
      </Column>
    </Table>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
