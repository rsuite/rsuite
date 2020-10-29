<!--start-code-->

```js
const fileList = [
  { name: 'file1.jpg', fileKey: 1 },
  { name: 'file2.jpg', fileKey: 2 }
];
const instance = (
  <div>
    <label>Disabled: </label>
    <Uploader disabled disabledFileItem defaultFileList={fileList} />

    <hr />
    <label>Read only: </label>
    <Uploader readOnly disabledFileItem defaultFileList={fileList} />

    <hr />
    <label>Plaintext: </label>
    <Uploader plaintext disabledFileItem defaultFileList={fileList} />
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
