### 更多设置

<!--start-code-->

```js
class PaginationAdvanced extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prev: true,
      next: true,
      first: true,
      last: true,
      ellipsis: true,
      boundaryLinks: true,
      activePage: 1
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(eventKey) {
    this.setState({ activePage: eventKey });
  }
  handleSetProp(key, value) {
    this.setState({ [key]: value });
  }
  renderToggle(type) {
    return (
      <span>
        {type}：
        <Toggle
          checked={this.state[type]}
          onChange={() => {
            this.handleSetProp(type, !this.state[type]);
          }}
        />
      </span>
    );
  }

  render() {
    return (
      <div>
        <div>
          {this.renderToggle('first')}
          {this.renderToggle('last')}
          {this.renderToggle('prev')}
          {this.renderToggle('next')}
          <br />
          <br />
          {this.renderToggle('ellipsis')}
          {this.renderToggle('boundaryLinks')}
        </div>

        <hr />
        <Pagination
          {...this.state}
          pages={30}
          maxButtons={5}
          activePage={this.state.activePage}
          onSelect={this.handleSelect}
        />
      </div>
    );
  }
}

ReactDOM.render(<PaginationAdvanced />);
```

<!--end-code-->
