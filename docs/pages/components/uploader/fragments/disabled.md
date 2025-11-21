<!--start-code-->

```js
import { Uploader, Button, Divider, VStack } from 'rsuite';

const fileList = [
  {
    name: 'A puppy sleeping on its belly',
    fileKey: 1,
    url: 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=265'
  },
  {
    name: 'A puppy looking at me with big eyes',
    fileKey: 2,
    url: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=300'
  }
];

const App = () => (
  <VStack gap={20}>
    <Divider label="Disabled" labelPlacement="start" />
    <Uploader
      disabled
      disabledFileItem
      defaultFileList={fileList}
      action="//jsonplaceholder.typicode.com/posts/"
    />

    <Divider label="Read only" labelPlacement="start" />

    <Uploader
      readOnly
      disabledFileItem
      defaultFileList={fileList}
      action="//jsonplaceholder.typicode.com/posts/"
    />

    <Divider label="Plaintext" labelPlacement="start" />

    <Uploader
      plaintext
      disabledFileItem
      defaultFileList={fileList}
      action="//jsonplaceholder.typicode.com/posts/"
    />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
