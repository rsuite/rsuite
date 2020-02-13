### 默认

<!--start-code-->

```js
const instance = (
  <Uploader
    shouldQueueUpdate={(nextFileList, file) => {
      console.log(nextFileList, file);

      if (file[0].name === 'IMG93.jpeg') {
        return false;
      }
      return true;
    }}
    onChange={value => {
      console.log(value, '0000');
    }}
    action="//jsonplaceholder.typicode.com/posts/"
  />
);

ReactDOM.render(instance);
```

<!--end-code-->
