<!--start-code-->

```js
import { CheckTree } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({ limits: [2, 3, 3], labels: layer => `Layer ${layer + 1}` });

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
      <CheckTree defaultExpandAll cascade={cascade} defaultValue={[2, 38]} data={data} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
