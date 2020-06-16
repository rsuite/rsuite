### Async

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users-role.json
 */

class AsynExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      items: []
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.getUsers('react');
  }

  getUsers(word) {
    fetch(`https://api.github.com/search/users?q=${word}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
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
  render() {
    const { items, loading } = this.state;
    return (
      <InputPicker
        data={items}
        style={{ width: 224 }}

        labelKey="login"
        valueKey="id"
        onSearch={this.handleSearch}
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
