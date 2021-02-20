### File check

<!--start-code-->

```js
const App = () => {
  const [loading, setLoading] = React.useState(false);
  return (
    <div>
      <Uploader
        action="//jsonplaceholder.typicode.com/posts/"
        shouldQueueUpdate={() => {
          alert('The file is checked and allowed to be added to the queue');
          return true;
        }}
        shouldUpload={() => {
          alert('File check passed, run upload');
          return true;
        }}
      />
      <hr />
      <Uploader
        action="//jsonplaceholder.typicode.com/posts/"
        shouldQueueUpdate={fileList => {
          setLoading(true);
          return new Promise(resolve => {
            setTimeout(() => {
              alert('The file is checked and allowed to be added to the queue');
              resolve(true);
            }, 2000);
          });
        }}
        shouldUpload={file => {
          return new Promise(resolve => {
            setTimeout(() => {
              alert('File check passed, run upload');
              resolve(true);
              setLoading(false);
            }, 2000);
          });
        }}
      >
        <Button loading={loading}>Upload via async check</Button>
      </Uploader>
    </div>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
