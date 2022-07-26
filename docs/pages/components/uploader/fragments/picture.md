<!--start-code-->

```js
import { Uploader } from 'rsuite';
import CameraRetroIcon from '@rsuite/icons/legacy/CameraRetro';

const App = () => (
  <Uploader multiple listType="picture" action="//jsonplaceholder.typicode.com/posts/">
    <button>
      <CameraRetroIcon />
    </button>
  </Uploader>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
