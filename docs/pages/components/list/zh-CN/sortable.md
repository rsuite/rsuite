### 可排序

> 必须给 List.Item 传入 `index` (组内唯一)

<!--start-code-->

```js
class ListDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [
        { text: 'Roses are red' },
        { text: 'Violets are blue' },
        { text: 'Sugar is sweet' },
        { text: 'And so are you' }
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
      <div>
        <List sortable onSort={this.handleSortEnd}>
          {data.map(({ text, disabled }, index) => (
            <List.Item key={index} index={index}>
              {text}
            </List.Item>
          ))}
        </List>
      </div>
    );
  }
}
ReactDOM.render(<ListDemo />);
```

<!--end-code-->
