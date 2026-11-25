<!--start-code-->

```js
import { Table } from 'rsuite';
const { Column, ColumnGroup, HeaderCell, Cell } = Table;

const data = [
  {
    id: 1,
    email: 'Leora13@yahoo.com',
    firstName: 'Ernest Schuppe Anderson',
    lastName: null,
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
  },
  {
    id: 5,
    email: 'Brisa46@hotmail.com',
    firstName: 'Suzanne',
    lastName: 'Wolff',
    city: 'Vandervort',
    companyName: 'Mayer - Considine'
  },
  {
    id: 6,
    email: 'Cody.Schultz56@gmail.com',
    firstName: 'Alessandra',
    lastName: null,
    city: 'Vandervort',
    companyName: 'Nikolaus and Sons'
  },
  {
    id: 7,
    email: 'Enrico_Beer@yahoo.com',
    firstName: 'Margret',
    lastName: 'Heller',
    city: 'Vandervort',
    companyName: 'Corwin, Maggio and Wintheiser'
  },
  {
    id: 8,
    email: 'Mitchel.Herman@yahoo.com',
    firstName: 'Emiliano',
    lastName: 'Moore',
    city: 'Gilberthaven',
    companyName: 'Gulgowski - Botsford'
  },
  {
    id: 9,
    city: 'Gilberthaven',
    email: 'Gaylord_Reichel16@yahoo.com',
    firstName: 'Alessandra',
    lastName: 'Smith',
    companyName: 'Maggio LLC'
  }
];

const App = () => {
  return (
    <Table bordered cellBordered height={420} headerHeight={80} data={data}>
      <Column width={70} align="center">
        <HeaderCell>Id</HeaderCell>
        <Cell dataKey="id" />
      </Column>
      <ColumnGroup header="Name">
        <Column width={130} colSpan={2}>
          <HeaderCell>First Name</HeaderCell>
          <Cell dataKey="firstName" />
        </Column>
        <Column width={130}>
          <HeaderCell>Last Name</HeaderCell>
          <Cell dataKey="lastName" />
        </Column>
      </ColumnGroup>

      <Column width={200} colSpan={2}>
        <HeaderCell>Address</HeaderCell>
        <Cell dataKey="city" />
      </Column>

      <Column width={200} flexGrow={1}>
        <HeaderCell>Company Name</HeaderCell>
        <Cell dataKey="companyName" />
      </Column>
    </Table>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
