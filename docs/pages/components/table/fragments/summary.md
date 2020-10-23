<!--start-code-->

```js
/**
 * import fakeData from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users.json
 */

const thousands = value => `${value}`.replace(/(?=(?!(\b))(\d{3})+$)/g, '$1,');

const NumberCell = ({ rowData, dataKey, ...props }) => (
  <Cell {...props}>{thousands(rowData[dataKey])}</Cell>
);

const HeaderSummary = ({ title, summary }) => (
  <div>
    <label>{title}</label>
    <div
      style={{
        fontSize: 18,
        color: '#2eabdf'
      }}
    >
      {thousands(summary)}
    </div>
  </div>
);

const data = fakeData.filter((v, i) => i < 5);

const App = () => {
  let stars = 0;
  let followers = 0;
  data.forEach(item => {
    stars += item.stars;
    followers += item.followers;
  });

  return (
    <Table height={300} headerHeight={80} data={data}>
      <Column width={160}>
        <HeaderCell>First Name</HeaderCell>
        <Cell dataKey="firstName" />
      </Column>

      <Column width={200} align="right">
        <HeaderCell>
          <HeaderSummary title="Stars" summary={stars} />
        </HeaderCell>
        <NumberCell dataKey="stars" />
      </Column>

      <Column width={200} align="right">
        <HeaderCell>
          <HeaderSummary title="Followers" summary={followers} />
        </HeaderCell>
        <NumberCell dataKey="followers" />
      </Column>
    </Table>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
