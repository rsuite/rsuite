<!--start-code-->

```js
import { Uploader, Button } from 'rsuite';

const fileList = [
  { name: 'file1.jpg', fileKey: 1 },
  { name: 'file2.jpg', fileKey: 2 }
];

const App = () => (
  <>
    <Uploader
      disabled
      disabledFileItem
      defaultFileList={fileList}
      action="//jsonplaceholder.typicode.com/posts/"
    >
      <Button>Disabled</Button>
    </Uploader>

    <hr />

    <Uploader
      readOnly
      disabledFileItem
      defaultFileList={fileList}
      action="//jsonplaceholder.typicode.com/posts/"
    >
      <Button>Read only</Button>
    </Uploader>

    <hr />

    <Uploader
      plaintext
      disabledFileItem
      defaultFileList={fileList}
      action="//jsonplaceholder.typicode.com/posts/"
    >
      <Button>Plaintext</Button>
    </Uploader>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
