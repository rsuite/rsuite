<!--start-code-->

```js
import { SelectPicker, HStack, Loader } from 'rsuite';

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

  const renderListbox = listbox => {
    if (items.length === 0) {
      return (
        <HStack justifyContent="center">
          <Loader content="Loading..." />
        </HStack>
      );
    }
    return listbox;
  };

  return (
    <SelectPicker
      data={items}
      w={224}
      onOpen={updateData}
      onSearch={updateData}
      renderListbox={renderListbox}
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
