<!--start-code-->

```js
import { Uploader } from 'rsuite';
import { RxCamera } from 'react-icons/rx';

const App = () => (
  <Uploader multiple listType="picture" action="//jsonplaceholder.typicode.com/posts/">
    <button>
      <RxCamera size={24} />
    </button>
  </Uploader>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
