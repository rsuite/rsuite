<!--start-code-->

```js
import { Uploader, Button } from 'rsuite';

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
    >
      <Button>Select files...</Button>
    </Uploader>

    <hr />
    <label>Read only: </label>
    <Uploader
      readOnly
      disabledFileItem
      defaultFileList={fileList}
      action="//jsonplaceholder.typicode.com/posts/"
    >
      <Button>Select files...</Button>
    </Uploader>

    <hr />
    <label>Plaintext: </label>
    <Uploader
      plaintext
      disabledFileItem
      defaultFileList={fileList}
      action="//jsonplaceholder.typicode.com/posts/"
    >
      <Button>Select files...</Button>
    </Uploader>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
