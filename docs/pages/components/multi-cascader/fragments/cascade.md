<!--start-code-->

```js
import { MultiCascader, Toggle } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({
  limits: [3, 3, 4],
  labels: (layer, value, faker) => {
    const methodName = ['jobArea', 'jobType', 'firstName'];
    return faker.person[methodName[layer]]();
  }
});

const App = () => {
  const [cascade, setCascade] = React.useState(true);
  const [value, setValue] = React.useState([]);

  const handleToggle = checked => {
    setCascade(checked);
    setValue([]);
  };

  return (
    <div>
      <Toggle checked={cascade} onChange={handleToggle}>
        Cascade
      </Toggle>
      <hr />
      <MultiCascader
        style={{ width: 280 }}
        data={data}
        value={value}
        cascade={cascade}
        onChange={setValue}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
