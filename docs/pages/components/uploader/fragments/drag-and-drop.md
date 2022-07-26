<!--start-code-->

```js
import { Uploader } from 'rsuite';

const App = () => {
  return (
    <Uploader action="//jsonplaceholder.typicode.com/posts/" draggable>
      <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span>Click or Drag files to this area to upload</span>
      </div>
    </Uploader>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
