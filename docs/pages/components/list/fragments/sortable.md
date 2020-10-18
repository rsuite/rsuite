<!--start-code-->

```js
function ListDemo() {
  const [data, setData] = React.useState([
    { text: 'Roses are red' },
    { text: 'Violets are blue' },
    { text: 'Sugar is sweet' },
    { text: 'And so are you' }
  ]);

  const handleSortEnd = ({ oldIndex, newIndex }) =>
    setData(prvData => {
      const moveData = prvData.splice(oldIndex, 1);
      const newData = [...prvData];
      newData.splice(newIndex, 0, moveData[0]);
      return newData;
    }, []);

  return (
    <List sortable onSort={handleSortEnd}>
      {data.map(({ text, disabled }, index) => (
        <List.Item key={index} index={index}>
          {text}
        </List.Item>
      ))}
    </List>
  );
}
ReactDOM.render(<ListDemo />);
```

<!--end-code-->
