### 用户头像

<!--start-code-->

```js
function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

const styles = {
  width: 150,
  height: 150
};

const App = () => {
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
      onSuccess={(response: Object, file: FileType) => {
        setUploading(false);
        Alert.success('Uploaded successfully');
        console.log(response);
      }}
      onError={() => {
        setFileInfo(null);
        setUploading(false);
        Alert.error('Upload failed');
      }}
    >
      <button style={styles}>
        {uploading && <Loader backdrop center />}
        {fileInfo ? (
          <img src={fileInfo} width="100%" height="100%" />
        ) : (
          <Icon icon="avatar" size="5x" />
        )}
      </button>
    </Uploader>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
