### Initial file list

<!--start-code-->

```js
const fileList = [
  {
    name: 'a.png',
    fileKey: 1,
    url:
      'https://user-images.githubusercontent.com/1203827/47638792-92414e00-db9a-11e8-89c2-f8f430a23cd3.png'
  },
  {
    name: 'b.png',
    fileKey: 2,
    url:
      'https://user-images.githubusercontent.com/1203827/47638807-9d947980-db9a-11e8-9ee5-e0cc9cd7e8ad.png'
  }
];
const instance = (
  <Uploader
    listType="picture-text"
    defaultFileList={fileList}
    action="//jsonplaceholder.typicode.com/posts/"
  />
);
ReactDOM.render(instance);
```

<!--end-code-->
