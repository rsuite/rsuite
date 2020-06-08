### Collection Sort

> `colection` has its own space, `index` of List.Item is required. (be unique in the collection)

<!--start-code-->

```js
class ListDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [
        { text: 'collection0 item0', collection: 0 },
        { text: 'collection0 item1', collection: 0 },
        { text: 'collection1 item0', collection: 1 },
        { text: 'collection1 item1', collection: 1 },
        { text: 'collection2 item0', collection: 2 },
        { text: 'collection2 item1', collection: 2 },
        { text: "I'm last one.", collection: 3, disabled: true }
      ]
    };
    this.handleSortEnd = this.handleSortEnd.bind(this);
  }

  handleSortEnd({ oldIndex, newIndex }) {
    this.setState(({ data }) => {
      const moveData = data.splice(oldIndex, 1);
      const newData = [...data];
      newData.splice(newIndex, 0, moveData[0]);
      return {
        data: newData
      };
    });
  }

  render() {
    const { data } = this.state;
    return (
      <List sortable onSort={this.handleSortEnd}>
        {data.map(({ text, collection, disabled }, index) => (
          <List.Item key={text} index={index} disabled={disabled} collection={collection}>
            {text}
          </List.Item>
        ))}
      </List>
    );
  }
}
ReactDOM.render(<ListDemo />);
```

<!--end-code-->
