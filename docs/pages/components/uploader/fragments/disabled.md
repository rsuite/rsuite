<!--start-code-->

```js
import { Uploader } from 'rsuite';

const fileList = [
  { name: 'file1.jpg', fileKey: 1 },
  { name: 'file2.jpg', fileKey: 2 }
];

const App = () => (
  <>
    <label>Disabled: </label>
    <Uploader
      disabled
      disabledFileItem
      defaultFileList={fileList}
      action="//jsonplaceholder.typicode.com/posts/"
    />

    <hr />
    <label>Read only: </label>
    <Uploader
      readOnly
      disabledFileItem
      defaultFileList={fileList}
      action="//jsonplaceholder.typicode.com/posts/"
    />

    <hr />
    <label>Plaintext: </label>
    <Uploader
      plaintext
      disabledFileItem
      defaultFileList={fileList}
      action="//jsonplaceholder.typicode.com/posts/"
    />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
