<!--start-code-->

```js
import { SelectPicker } from 'rsuite';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);

const App = () => {
  const [items, setItems] = React.useState([]);
  const updateData = () => {
    if (items.length === 0) {
      setItems(data);
    }
  };

  const renderMenu = menu => {
    if (items.length === 0) {
      return (
        <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
          <SpinnerIcon spin /> Loading...
        </p>
      );
    }
    return menu;
  };

  return (
    <SelectPicker
      data={items}
      style={{ width: 224 }}
      onOpen={updateData}
      onSearch={updateData}
      renderMenu={renderMenu}
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
