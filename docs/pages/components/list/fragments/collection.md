<!--start-code-->

```js
function ListDemo() {
  const [data, setData] = React.useState([
    { text: 'collection0 item0', collection: 0 },
    { text: 'collection0 item1', collection: 0 },
    { text: 'collection1 item0', collection: 1 },
    { text: 'collection1 item1', collection: 1 },
    { text: 'collection2 item0', collection: 2 },
    { text: 'collection2 item1', collection: 2 },
    { text: "I'm last one.", collection: 3, disabled: true }
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
      {data.map(({ text, collection, disabled }, index) => (
        <List.Item key={text} index={index} disabled={disabled} collection={collection}>
          {text}
        </List.Item>
      ))}
    </List>
  );
}
ReactDOM.render(<ListDemo />);
```

<!--end-code-->
