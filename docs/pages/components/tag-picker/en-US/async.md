### Async

<!--start-code-->

```js
class AsynExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      items: [],
      cacheData: [],
      value: []
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getUsers('react');
  }

  handleSelect(value, item, event) {
    const { cacheData } = this.state;
    _remove(cacheData, v => v === value);
    cacheData.push(item);
    this.setState({
      cacheData
    });
  }

  getUsers(word) {
    fetch(`https://api.github.com/search/users?q=${word}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          loading: false,
          items: data.items
        });
      })
      .catch(e => console.log('Oops, error', e));
  }

  handleSearch(word) {
    if (!word) {
      return;
    }

    this.setState({
      loading: true
    });
    this.getUsers(word);
  }
  handleChange(value) {
    this.setState({ value });
  }
  render() {
    const { items, loading } = this.state;
    return (
      <TagPicker
        data={items}
        cacheData={this.state.cacheData}
        value={this.state.value}
        style={{ width: 300 }}
        
        labelKey="login"
        valueKey="id"
        onChange={this.handleChange}
        onSearch={this.handleSearch}
        onSelect={this.handleSelect}
        renderMenu={menu => {
          if (loading) {
            return (
              <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
                <Icon icon="spinner" spin /> Loading...
              </p>
            );
          }
          return menu;
        }}
      />
    );
  }
}

ReactDOM.render(<AsynExample />);
```

<!--end-code-->
