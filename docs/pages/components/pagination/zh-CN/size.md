### 尺寸

<!--start-code-->

```js
class PaginationBasic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 5
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(eventKey) {
    this.setState({
      activePage: eventKey
    });
  }

  render() {
    return (
      <div>
        <Pagination
          prev
          last
          next
          first
          size="lg"
          pages={10}
          activePage={this.state.activePage}
          onSelect={this.handleSelect}
        />
        <Divider />
        <Pagination
          prev
          last
          next
          first
          size="md"
          pages={10}
          activePage={this.state.activePage}
          onSelect={this.handleSelect}
        />
        <Divider />
        <Pagination
          prev
          last
          next
          first
          size="sm"
          pages={10}
          activePage={this.state.activePage}
          onSelect={this.handleSelect}
        />
        <Divider />
        <Pagination
          prev
          last
          next
          first
          size="xs"
          pages={10}
          activePage={this.state.activePage}
          onSelect={this.handleSelect}
        />
      </div>
    );
  }
}

ReactDOM.render(<PaginationBasic />);
```

<!--end-code-->
