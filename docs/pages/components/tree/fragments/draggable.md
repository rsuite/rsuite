<!--start-code-->

```js
import { Tree } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({ limits: [2, 3, 3], labels: layer => `Layer ${layer + 1}` });

const App = () => {
  const [treeData, setTreeData] = React.useState(data);
  return (
    <Tree
      data={treeData}
      draggable
      defaultExpandAll
      onDrop={({ createUpdateDataFunction }, event) =>
        setTreeData(createUpdateDataFunction(treeData))
      }
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
