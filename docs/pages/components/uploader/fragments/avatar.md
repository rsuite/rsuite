<!--start-code-->

```js
import { Uploader, Message, Loader, Box, useToaster } from 'rsuite';
import { RxAvatar } from 'react-icons/rx';

function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

const App = () => {
  const toaster = useToaster();
  const [uploading, setUploading] = React.useState(false);
  const [fileInfo, setFileInfo] = React.useState(null);

  return (
    <Uploader
      fileListVisible={false}
      listType="picture"
      action="//jsonplaceholder.typicode.com/posts/"
      onUpload={file => {
        setUploading(true);
        previewFile(file.blobFile, value => {
          setFileInfo(value);
        });
      }}
      onSuccess={(response, file) => {
        setUploading(false);
        toaster.push(<Message type="success">Uploaded successfully</Message>);
        console.log(response);
      }}
      onError={() => {
        setFileInfo(null);
        setUploading(false);
        toaster.push(<Message type="error">Upload failed</Message>);
      }}
    >
      <Box as="button" w={150} h={150}>
        {uploading && <Loader backdrop center />}
        {fileInfo ? <img src={fileInfo} width="100%" height="100%" /> : <RxAvatar size={80} />}
      </Box>
    </Uploader>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
