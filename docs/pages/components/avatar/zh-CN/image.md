### 图片

您可以为 `<Avatar>` 设置 `alt` 以确保当图片加载失败时，依然可以显示文字版本的头像

<!--start-code-->

```js
const instance = (
  <div className="avatar-group">
    <Avatar src="https://404.error" alt="RS" />
    <Avatar src="https://avatars2.githubusercontent.com/u/12592949?s=460&v=4" />
    <Avatar
      circle
      src="https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"
    />
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
