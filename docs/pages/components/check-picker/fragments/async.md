<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users-role.json
 */

const App = () => {
  const [items, setItems] = React.useState([]);
  const updateData = () => {
    if (items.length === 0) {
      setItems(data);
    }
  };
  const renderMenu = (menu) => {
    if (items.length === 0) {
      return (
        <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
          <Spinner spin /> loading...
        </p>
      );
    }
    return menu;
  };

  return (
    <CheckPicker
      data={items}
      onOpen={updateData}
      onSearch={updateData}
      style={{ width: 224 }}
      renderMenu={renderMenu}
    />
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
