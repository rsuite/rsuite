### 自定义文件描述

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
    renderFileInfo={(file, fileElement) => {
      return (
        <div>
          <span>文件名称: {file.name}</span>
          <p>文件链接: {file.url}</p>
        </div>
      );
    }}
  />
);
ReactDOM.render(instance);
```

<!--end-code-->
