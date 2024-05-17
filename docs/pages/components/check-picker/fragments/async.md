<!--start-code-->

```js
import { CheckPicker } from 'rsuite';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);

const App = () => {
  const [items, setItems] = React.useState([]);
  const updateData = () => {
    setTimeout(() => {
      if (items.length === 0) {
        setItems(data);
      }
    }, 2000);
  };
  const renderMenu = menu => {
    if (items.length === 0) {
      return (
        <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
          <SpinnerIcon spin /> loading...
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

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
