<!--start-code-->

```js
import { CheckTreePicker } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({ limits: [2, 3, 3], labels: ['Provincial', 'County', 'Town'] });

const App = () => {
  const [cascade, setCascade] = React.useState(false);
  return (
    <div>
      Cascade:{' '}
      <Toggle
        checked={cascade}
        onChange={checked => {
          setCascade(checked);
        }}
      />
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
