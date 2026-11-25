<!--start-code-->

```js
import { List } from 'rsuite';

const defaultData = [
  { text: 'Finish the project report' },
  { text: 'Attend team meeting at 3 PM' },
  { text: 'Buy groceries for the week' },
  { text: 'Call mom to check in' }
];

const App = () => {
  const [data, setData] = React.useState(defaultData);

  const handleSortEnd = ({ oldIndex, newIndex }) =>
    setData(prvData => {
      const moveData = prvData.splice(oldIndex, 1);
      const newData = [...prvData];
      newData.splice(newIndex, 0, moveData[0]);
      return newData;
    }, []);

  return (
    <List sortable bordered onSort={handleSortEnd}>
      {data.map(({ text }, index) => (
        <List.Item key={index} index={index}>
          {text}
        </List.Item>
      ))}
    </List>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
