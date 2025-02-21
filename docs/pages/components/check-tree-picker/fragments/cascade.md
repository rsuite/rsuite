<!--start-code-->

```js
import { CheckTreePicker } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({
  limits: [3, 3, 4],
  labels: (layer, value, faker) => {
    const methodName = ['jobArea', 'jobType', 'firstName'];
    return faker.person[methodName[layer]]();
  }
});

const App = () => {
  const [cascade, setCascade] = React.useState(false);
  return (
    <div>
      <Toggle
        checked={cascade}
        onChange={checked => {
          setCascade(checked);
        }}
      >
        Cascade
      </Toggle>
      <hr />
      <CheckTreePicker
        defaultExpandAll
        cascade={cascade}
        defaultValue={[2, 38]}
        data={data}
        style={{ width: 280 }}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
