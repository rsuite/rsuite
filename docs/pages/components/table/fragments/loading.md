<!--start-code-->

```js
/**
 * import fakeData from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users.json
 */

const App = () => {
  const data = fakeData.filter((v, i) => i < 5);
  const [loading, setLoading] = React.useState(true);
  return (
    <div>
      <Table loading={loading} height={300} data={data}>
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
          <HeaderCell>Street</HeaderCell>
          <Cell dataKey="street" />
        </Column>
      </Table>
      <hr />
      <div>
        Loading：
        <Toggle
          checkedChildren="On"
          unCheckedChildren="Off"
          checked={loading}
          onChange={setLoading}
        />
      </div>
    </div>
  );
};
ReactDOM.render(<App />);
```

<!--end-code-->
