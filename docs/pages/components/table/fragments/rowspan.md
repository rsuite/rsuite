<!--start-code-->

```js
import { Table } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;
const data = [
  {
    id: 1,
    email: 'Leora13@yahoo.com',
    firstName: 'Ernest Schuppe Anderson',
    lastName: null,
    city: 'New Gust',
    cityRowSpan: 3,
    street: 'Dickinson Keys',
    streetRowSpan: 2,
    companyName: 'Lebsack - Nicolas'
  },
  {
    id: 2,
    email: 'Mose_Gerhold51@yahoo.com',
    firstName: 'Janis',
    lastName: 'Bode',
    city: 'New Gust',
    street: 'Dickinson Keys',
    companyName: 'Glover - Hermiston'
  },
  {
    id: 3,

    email: 'Frieda.Sauer61@gmail.com',
    firstName: 'Makenzie Vandervort',
    lastName: null,
    city: 'New Gust',
    street: 'Legros Divide',
    companyName: 'Williamson - Kassulke'
  },
  {
    id: 4,
    email: 'Eloisa.OHara@hotmail.com',
    firstName: 'Ciara',
    lastName: 'Towne',
    city: 'Vandervort',
    cityRowSpan: 4,
    street: 'Mosciski Estate',
    streetRowSpan: 2,
    companyName: 'Hilpert, Eichmann and Brown'
  },
  {
    id: 5,
    email: 'Brisa46@hotmail.com',
    firstName: 'Suzanne',
    lastName: 'Wolff',
    city: 'Vandervort',
    street: 'Mosciski Estate',
    companyName: 'Mayer - Considine'
  },
  {
    id: 6,
    email: 'Cody.Schultz56@gmail.com',
    firstName: 'Alessandra',
    lastName: null,
    city: 'Vandervort',
    street: 'Kali Spurs',
    streetRowSpan: 2,
    companyName: 'Nikolaus and Sons'
  },
  {
    id: 7,
    email: 'Enrico_Beer@yahoo.com',
    firstName: 'Margret',
    lastName: 'Heller',
    city: 'Vandervort',
    street: 'Kali Spurs',
    companyName: 'Corwin, Maggio and Wintheiser'
  },
  {
    id: 8,
    email: 'Mitchel.Herman@yahoo.com',
    firstName: 'Emiliano',
    lastName: 'Moore',
    city: 'Gilberthaven',
    cityRowSpan: 2,
    street: null,
    companyName: 'Gulgowski - Botsford'
  },
  {
    id: 9,

    email: 'Gaylord_Reichel16@yahoo.com',
    firstName: 'Alessandra',
    lastName: 'Smith',
    city: 'Gilberthaven',
    street: 'Kali Spurs',
    companyName: 'Maggio LLC'
  }
];

const App = () => {
  return (
    <Table bordered cellBordered autoHeight data={data}>
      <Column width={80} fixed>
        <HeaderCell>Id</HeaderCell>
        <Cell dataKey="id" />
      </Column>
      <Column
        width={200}
        verticalAlign="middle"
        rowSpan={rowData => {
          return rowData.cityRowSpan;
        }}
      >
        <HeaderCell>City</HeaderCell>
        <Cell dataKey="city" />
      </Column>

      <Column
        width={200}
        verticalAlign="middle"
        rowSpan={rowData => {
          return rowData.streetRowSpan;
        }}
      >
        <HeaderCell>Street</HeaderCell>
        <Cell dataKey="street" />
      </Column>

      <Column width={130}>
        <HeaderCell>First Name</HeaderCell>
        <Cell dataKey="firstName" />
      </Column>

      <Column width={130}>
        <HeaderCell>Last Name</HeaderCell>
        <Cell dataKey="lastName" />
      </Column>

      <Column width={200}>
        <HeaderCell>Company Name</HeaderCell>
        <Cell dataKey="companyName" />
      </Column>

      <Column width={80} fixed="right">
        <HeaderCell>...</HeaderCell>
        <Cell>Edit</Cell>
      </Column>
    </Table>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
