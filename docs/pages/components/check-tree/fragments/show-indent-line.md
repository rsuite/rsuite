<!--start-code-->

```js
import { CheckTree } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({ limits: [2, 3, 3], labels: layer => `Layer ${layer + 1}` });

const App = () => {
  return (
    <>
      <CheckTree data={data} defaultExpandAll showIndentLine />
    </>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
